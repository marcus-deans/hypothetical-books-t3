import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AddGenre() {
  const [genreName, setGenreName] = useState("");
  const addMutation = api.genres.add.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setGenreName(enteredName);
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      const addResult = addMutation.mutate({ name: genreName });
      setTimeout(() => {
        void router.push("/genres");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Genre</title>
      </Head>
      <div className="pt-6">
        <form className="rounded bg-white px-6 py-6 inline-block">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Add Genre
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex space-x-10 justify-center">
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="genre"
                      type="text"
                      placeholder="Genre Name"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
