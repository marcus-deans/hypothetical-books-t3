import { useZxing } from "react-zxing";
import { useState } from "react";
import { Button } from "@mui/material";
import { api } from "../utils/api";
import type { BookDisplayDetails } from "./books/add";
import { useRouter } from "next/router";

export default function Scanner() {
  const [result, setResult] = useState("");
  const [isbn, setIsbn] = useState("");
  const [paused, setPaused] = useState(false);
  const [displayedBook, setDisplayedBook] = useState<BookDisplayDetails | null>(
    null
  );

  const router = useRouter();

  const retrieveIdQuery = api.books.getIdByIsbn13.useQuery(
    { isbn13: isbn },
    { enabled: !!isbn }
  );

  const { ref } = useZxing({
    paused,
    onResult(result) {
      setResult(result.getText());
    },
  });

  const handleClick = () => {
    setIsbn(result);
    if (retrieveIdQuery.isSuccess) {
      setTimeout(() => {
        void router.push(`/books/${retrieveIdQuery.data?.id}/detail`);
      }, 500);
    }
    console.log("ISBN: ", isbn);
  };

  return (
    <>
      <div className="w-1/2 rounded-lg bg-gray-400">
        <video ref={ref} />
      </div>
      <div className="space-y-3 space-x-5">
        <div className="bg-blue rounded-lg">
          <span className="text-lg text-white">Last result:</span>
          <span className="text-lg text-white">{result}</span>
        </div>
        <Button variant="contained" onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : " Pause"}
        </Button>
        <Button variant="contained" onClick={handleClick}>
          See Details
        </Button>
        {!retrieveIdQuery.isSuccess ? null : <div>Details</div>}
      </div>
    </>
  );
}
