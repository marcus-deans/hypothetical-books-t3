import { useZxing } from "react-zxing";
import { useState } from "react";
import { Button } from "@mui/material";
import { api } from "../utils/api";
import type { BookDisplayDetails } from "./books/add";

export default function Scanner() {
  const [result, setResult] = useState("");
  const [isbn, setIsbn] = useState("");
  const [paused, setPaused] = useState(false);
  const [displayedBook, setDisplayedBook] = useState<BookDisplayDetails | null>(
    null
  );

  const retrieveDetailsQuery = api.googleBooks.retrieveDetailsByISBNs.useQuery(
    { isbns: [isbn] },
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
    console.log("ISBN: ", isbn);
  };

  return (
    <>
      <video ref={ref} />
      <div>
        <p>
          <span className="text-lg text-white">Last result:</span>
          <span className="text-lg text-white">{result}</span>
        </p>
        <Button variant="contained" onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : " Pause"}
        </Button>
        <Button variant="contained" onClick={handleClick}>
          See Details
        </Button>
        {!retrieveDetailsQuery.isSuccess ? null : <div>Details</div>}
      </div>
    </>
  );
}
