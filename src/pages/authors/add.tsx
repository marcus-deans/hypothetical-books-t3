import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

export default function AddAuthor() {
  const [authorName, setAuthorName] = useState("");
  const addMutation = api.authors.add.useMutation();
  const router = useRouter();
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setAuthorName(enteredName);
  };
  const handleSubmit = () => {
    console.log(authorName);
    setAuthorName("");
    addMutation.mutate({ name: authorName });
    setTimeout(() => {
      void router.push(`/authors`);
    }, 500);
  };

  return (
    <div className="pt-6">
      <div className="pt-6 px-6 rounded-lg bg-white inline-block">
        <div className="items-center">
          <div>
            <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            {"Add Author"}
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="genre"
            type="text"
            placeholder="Author Name"
            onChange={inputHandler}
          />
        </div>
        <div className="flex items-center justify-between pb-6">
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
