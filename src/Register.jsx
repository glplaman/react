import { useEffect, useState } from "react";
export default function () {
  const [uname, setUname] = useState("");
  const [upass, setUpass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setUname("");
    setUpass("");
    alert(`'uname',${uname},'upass',${upass}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="your name" onChange={(e) => setUname(e.target.value)} />
      <input type="password" placeholder="your pass" onChange={(e) => setUpass(e.target.value)} />
      <button type="submit">submit</button>
    </form>
  );
}
