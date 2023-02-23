import  Head  from "next/head"
import { GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import DetailLink from "../../components/table-components/DetailLink";
import Box from "@mui/material/Box";
import Link from "next/link";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import { api } from "../../utils/api";

const index = () => {
    const buybackQuery =
    api.purchaseOrders.getAllWithOverallMetrics.useQuery({
      cursor: null,
      limit: 50,
    });

  const buyBacks = buybackQuery?.data?.items ?? [];
    const columns: GridColDef[] = [
        {
          field: "id",
          headerName: "BuyBack ID",
          headerClassName: "header-theme",
          flex: 1,
        },
        {
          field: "date",
          headerName: "BuyBack Date",
          headerClassName: "header-theme",
          flex: 1,
        },
        {
          field: "vendor",
          headerName: "Vendor",
          headerClassName: "header-theme",
          flex: 1,
        },
        
        {
          field: "uniqueBooks",
          headerName: "Unique Books",
          headerClassName: "header-theme",
          flex: 1,
          maxWidth: 150,
        },
        {
            field: "totalBooks",
            headerName: "Total Books",
            headerClassName: "header-theme",
            flex: 1,
            maxWidth: 150,
          },
          {
            field: "revenue",
            headerName: "Total Revenue",
            headerClassName: "header-theme",
            flex: 1,
            maxWidth: 150,
          },
        {
          field: "detail",
          headerName: "Detail",
          headerClassName: "header-theme",
          flex: 1,
          maxWidth: 70,
          align : "center",
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams) => (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
            <DetailLink url={`/purchases/${params.id}/detail`} />
          ),
        },
      ];

      const rows = buyBacks.map((buyBack) => {
        return {
          id: buyBack.purchaseOrder.id,
          date: buyBack.purchaseOrder.date.toLocaleDateString(),
          totalQuantity: buyBack.totalQuantity,
          vendor: buyBack.purchaseOrder.vendor.name,
          totalPrice: `$${buyBack.totalPrice.toFixed(2)}`,
          totalUniqueBooks: buyBack.totalUniqueBooks,
        };
      });
  return (
    <>
     <Head>
    <title>BuyBacks</title>
    </Head>
    <div className="flex space text-neutral-50 mt-3 h-3/4 overflow-hidden">
        <h1 className="text-2xl inline-block"> BuyBack </h1>
        <Link className="inline-block text-blue-600 ml-2 text-2xl" href="/purchases/add/order"> + </Link>
      </div>
      
      <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Box
          sx={{
            height: 'auto',
            maxHeight: 750,
            "& .header-theme": {
              backgroundColor: "rgba(56, 116, 203, 0.35)",
            },
          }}
        >
          <StripedDataGrid
            rows={rows}
            columns={columns}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSize={14}
            rowsPerPageOptions={[14]}
            autoHeight={true}
            getRowHeight={() => 'auto'}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </div>
    </>
  )
}

export default index
