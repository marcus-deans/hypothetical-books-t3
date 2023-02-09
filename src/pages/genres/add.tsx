import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

export default function AddGenre() {
  const [genreName, setGenreName] = useState("");
  const addMutation = api.genres.add.useMutation();

  const router = useRouter();
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setGenreName(enteredName);
  };
  const handleSubmit = (e: any) => {
    console.log(genreName);
    setGenreName("");
    addMutation.mutate({ name: genreName });
    setTimeout(() => {
      void router.push(`/genres/`);
    }, 500);
  };

  return (
    <div className="flex w-full items-center">
      <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Genre Name
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="genre"
            type="text"
            placeholder="Genre Name"
            onChange={inputHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
