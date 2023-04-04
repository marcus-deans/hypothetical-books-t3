import { useZxing } from "react-zxing";
import { useState } from "react";

export default function Scanner() {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
}
