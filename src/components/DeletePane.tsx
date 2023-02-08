import React from "react";

type DeletePaneProps = {
  itemName: string;
  onSubmit: () => void;
};

export default function DeletePane(props: DeletePaneProps) {
  return (
    <div>
      <div>
        <h1>Delete</h1>
      </div>
    </div>
  );
}
