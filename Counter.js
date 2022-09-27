import { setDocumentMode } from "parse5/lib/tree-adapters/default";
import { useState } from "react";

function Counter() {
  let [count, counter] = useState(0);
  const increment = () => {
    counter(count + 1);
  };
  return (
    <>
      <h3>{count}</h3>

      <button onClick={increment}>increment</button>
    </>
  );
}
export default Counter;
