import { useEffect, useState } from "react";
export default function Test() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect count", count);
  }, []);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>count: {count}</button>
    </div>
  );
}
