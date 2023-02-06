import React, { useEffect, useState } from "react";

//
import type {
  Column,
  ColumnDef,
  RowData,
  SortingState,
  Table,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../../utils/api";
import { logger } from "../../../utils/logger";

export type SalesLine = {
  bookTitle: string;
  isbn13: string;
  unitWholesalePrice: number;
  quantity: number;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<SalesLine>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export default function Edit(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // const rerender = React.useReducer(() => ({}), {})[1];
  const columns = React.useMemo<ColumnDef<SalesLine>[]>(
    () => [
      {
        accessorKey: "bookTitle",
        header: () => <span>Book Title</span>,
        footer: (props) => props.coluid,
      },
      {
        accessorFn: (row) => row.isbn13,
        id: "isbn_13",
        header: () => <span>ISBN 13</span>,
        footer: (props) => props.coluid,
      },
      {
        accessorKey: "unitWholesalePrice",
        header: () => <span>Wholesale Price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "quantity",
        header: () => <span>Quantity</span>,
        footer: (props) => props.column.id,
      },
      // {
      //   header: "Information",
      //   footer: (props) => props.column.id,
      //   columns: [
      //     {
      //       accessorKey: "bookTitle",
      //       header: () => <span>Book Title</span>,
      //       footer: (props) => props.column.id,
      //     },
      //     {
      //       accessorFn: (row) => row.isbn_13,
      //       id: "isbn_13",
      //       header: () => <span>ISBN 13</span>,
      //       footer: (props) => props.column.id,
      //     },
      //   ],
      // },
      // {
      //   header: "Info",
      //   footer: (props) => props.column.id,
      //   columns: [
      //     {
      //       accessorKey: "wholesalePrice",
      //       header: () => <span>Wholesale Price</span>,
      //       footer: (props) => props.column.id,
      //     },
      //     {
      //       accessorKey: "quantity",
      //       header: () => <span>Quantity</span>,
      //       footer: (props) => props.column.id,
      //     },
      //   ],
      // },
    ],
    []
  );

  // const [data, setData] = React.useState(() => makeData(1000));
  // const refreshData = () => setData(() => makeData(1000));
  // const initialDataValue = [
  //   {
  //     bookTitle: "The Hobbit",
  //     isbn_13: "9780547928227",
  //     wholesalePrice: 10,
  //     quantity: 1,
  //   },
  //   {
  //     bookTitle: "The Lord of the Rings",
  //     isbn_13: "9780547928227",
  //     wholesalePrice: 20,
  //     quantity: 15,
  //   },
  // ];

  const { id } = props;
  const salesQuery =
    api.salesReconciliations.getByIdWithOverallMetrics.useQuery({ id });
  const totalPrice = salesQuery?.data?.totalPrice.toString();
  const retrievedSalesLines =
    salesQuery?.data?.salesReconciliationWithOverallMetrics?.salesLines ?? [];
  const initialDataValue = retrievedSalesLines.map((salesLine) => ({
    bookTitle: salesLine.book.title,
    isbn13: salesLine.book.isbn_13,
    unitWholesalePrice: salesLine.unitWholesalePrice,
    quantity: salesLine.quantity,
  }));

  const [data, setData] = useState(initialDataValue);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const saveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logger.info(data);
  };

  const table: Table<RowData> = useReactTable({
    data,
    columns,
    state: {
      //eslint-disable-next-line
      sorting,
    },
    onSortingChange: setSorting,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: vale,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="w-full border-separate bg-white text-left text-sm text-gray-500">
        <thead className="space-x-4 bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="space-x-4 rounded-md">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="font- px-6 py-4 text-base font-medium text-gray-900"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ▲",
                          desc: " ▼",
                        }[header.column.getIsSorted() as string] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="hover:bg-gray-150">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-4 py-2 font-normal">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="grid grid-cols-5 items-center gap-2 bg-white">
        <div className="col-span-4 flex items-center">
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1 px-3">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border p-1"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="pl-4"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {/*TODO: implement button functionality and DB call*/}
        <button
          className="items-left text-red-350 col-span-1 rounded-sm"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
      <div className="place-items-center bg-white px-6 text-green-500">
        Total Cost {totalPrice}
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  );
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 rounded border shadow"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 rounded border shadow"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 rounded border shadow"
    />
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  /*
   * Prefetching the `post.byId` query here.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.salesReconciliations.getByIdWithOverallMetrics.prefetch({ id });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

// import { useState } from "react";
// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next";
// import { createProxySSGHelpers } from "@trpc/react-query/ssg";
// import { appRouter } from "../../../server/api/root";
// import { createInnerTRPCContext } from "../../../server/api/trpc";
// import superjson from "superjson";
// import { api } from "../../../utils/api";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
//
// type SalesLine = {
//   bookTitle: string;
//   isbn_13: string;
//   wholesalePrice: number;
//   quantity: number;
// };
//
// const columnHelper = createColumnHelper<SalesLine>();
//
// const columns = [
//   columnHelper.accessor("bookTitle", {
//     cell: (info) => info.getValue(),
//     header: () => <span>First Name</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("isbn_13", {
//     cell: (info) => info.getValue(),
//     header: () => <span>ISBN 13</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("wholesalePrice", {
//     cell: (info) => info.getValue(),
//     header: () => <span>Wholesale Price</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("quantity", {
//     cell: (info) => info.getValue(),
//     header: () => <span>Quantity</span>,
//     footer: (info) => info.column.id,
//   }),
// ];
//
// const defaultData: SalesLine[] = [
//   {
//     bookTitle: "The Hobbit",
//     isbn_13: "9780547928227",
//     wholesalePrice: 10,
//     quantity: 1,
//   },
// ];
// export default function EditPage(
//   props: InferGetServerSidePropsType<typeof getServerSideProps>
// ) {
//   const { id } = props;
//
//   const salesDetailsQuery =
//     api.salesReconciliations.getByIdWithOverallMetrics.useQuery({ id });
//   const { data } = salesDetailsQuery;
//
//   const [salesData, setSalesData] = useState(() => [...defaultData]);
//
//   const table = useReactTable({
//     salesData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//
//   return (
//     <div className="p-2">
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           {table.getFooterGroups().map((footerGroup) => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className="h-4" />
//     </div>
//   );
// }
//
// export async function getServerSideProps(
//   context: GetServerSidePropsContext<{ id: string }>
// ) {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: createInnerTRPCContext({ session: null }),
//     transformer: superjson,
//   });
//   const id = context.params?.id as string;
//   /**
//    * Prefetching the `post.byId` query here.
//    * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
//    */
//   await ssg.salesReconciliations.getByIdWithOverallMetrics.prefetch({ id });
//
//   // Make sure to return { props: { trpcState: ssg.dehydrate() } }
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       id,
//     },
//     revalidate: 1,
//   };
// }
