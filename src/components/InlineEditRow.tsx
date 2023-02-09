import type { Dispatch } from "react";
import React, { useState } from "react";
// const [value, setValue] = useState();
//
// return <InlineEdit value={value} setValue={setValue} />;

export const InlineEdit = (
  labelName: string,
  value: string,
  setValue: Dispatch<string>
) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event: React.FormEvent<HTMLInputElement>) =>
    setEditingValue(event.currentTarget.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const onBlur = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim() === "") {
      setEditingValue(value);
    } else {
      setValue(event.currentTarget.value);
    }
  };

  return (
    <input
      type="text"
      aria-label={labelName}
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};
