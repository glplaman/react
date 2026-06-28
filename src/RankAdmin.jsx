import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Rank.css";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function () {
  const [rank, setRank] = useState({ name: "", credit: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await supabase.from("ranks").insert(rank).single();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);
    setRank({ name: "", credit: 0 });
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Credit</h2>
        <label htmlFor="sn">姓名</label>
        <input type="text" id="sn" onChange={(e) => setRank((prev) => ({ ...prev, name: e.target.value }))} />
        <label htmlFor="credit">积分</label>
        <input type="text" id="credit" onChange={(e) => setRank((prev) => ({ ...prev, credit: e.target.value }))} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
