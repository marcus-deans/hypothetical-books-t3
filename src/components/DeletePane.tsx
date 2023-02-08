import React from "react";
import Link from "next/link";

type DeletePaneProps = {
  itemName: string;
  itemIdentifier: string;
  cancelUrl: string;
  isDeleting: boolean;
  handleDelete: () => void;
};

export default function DeletePane(props: DeletePaneProps) {
  return (
    <div className="py-15 flex w-full items-center justify-center rounded-lg bg-gray-100 px-10">
      <main className="flex w-full flex-1 flex-col items-center justify-center p-20 text-center">
        <h1 className="text-2xl font-bold">
          Delete {props.itemName}
          {": "}
          <span className="text-blue-600">{props.itemIdentifier}</span>
        </h1>

        <p className="mt-3 text-lg">
          Are you sure you want to delete{" "}
          <span className="text-blue-600">{props.itemIdentifier}</span>?
        </p>

        <div className="mt-4 flex">
          <button
            className="mr-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={props.handleDelete}
            disabled={props.isDeleting}
          >
            {props.isDeleting ? "Deleting..." : "Delete"}
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
