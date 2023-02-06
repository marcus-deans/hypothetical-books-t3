import React from "react";

type TableCellProps = {
  text: string;
};

export default function TableCell(props: TableCellProps) {
  return (
    <td className="px-6 py-4">
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
        {props.text}
      </span>
    </td>
  );
}
