// const tableHeaders = [
//   "ID",
//   "Name",
//   "Edit",
//   "Delete"
// ];

import React from "react";
import TableCell from "./TableCell";
import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";

type VendorRowProps = {
  id: string;
  name: string;
};

export default function VendorRow(props: VendorRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{props.name}</div>
          <div className="text-gray-400">Name</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <EditLink url={`/vendors/${encodeURIComponent(props.id)}/edit`} />
      </td>
      <td className="px-6 py-4">
        <DeleteLink url={`/vendors/${encodeURIComponent(props.id)}/delete`} />
      </td>
    </tr>
  );
}
