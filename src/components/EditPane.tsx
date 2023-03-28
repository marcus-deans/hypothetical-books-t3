import React from "react";
import Link from "next/link";

type EditPrivilegePaneProps = {
  currentPrivilege: boolean;
  itemName: string;
  itemIdentifier: string;
  cancelUrl: string;
  isEditing: boolean;
  handleEdit: () => void;
};

export default function EditPrivilegePane(props: EditPrivilegePaneProps) {
  return (
    <div className="py-15 flex w-full items-center justify-center rounded-lg bg-gray-100 px-10">
      <main className="flex w-full flex-1 flex-col items-center justify-center p-20 text-center">
        <h1 className="text-2xl font-bold">
          Edit Privilege{props.itemName}
          {": "}
          <span className="text-blue-600">{props.itemIdentifier}</span>
        </h1>

        <p className="mt-3 text-lg">
          Are you sure you want to {props.currentPrivilege ? "take away admin privilege from " : "give admin privilege to "} 
          <span className="text-blue-600">{props.itemIdentifier}</span>?
        </p>

        <div className="mt-4 flex">
          <button
            className="mr-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={props.handleEdit}
            disabled={props.isEditing}
          >
            {props.isEditing ? "Submitting..." : "Submit"}
          </button>
          <Link
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            href={props.cancelUrl}
          >
            Cancel
          </Link>
        </div>
      </main>
    </div>
  );
}
