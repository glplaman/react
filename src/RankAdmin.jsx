import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./RankAdmin.css";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function RankAdmin() {
  const [rank, setRank] = useState({ usn: "", uname: "", ucredit: 0, ucourse: "", uclass: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await supabase.from("ranks").insert(rank).single();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);
    console.log(rank);

    setRank({ usn: "", uname: "", ucredit: 0, ucourse: "", uclass: "" });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Rank Admin</h2>
        <label htmlFor="usn">学号</label>
        <input type="text" id="usn" onChange={(e) => setRank((prev) => ({ ...prev, usn: e.target.value }))} />
        <label htmlFor="uname">姓名</label>
        <input type="text" id="uname" onChange={(e) => setRank((prev) => ({ ...prev, uname: e.target.value }))} />
        <label htmlFor="ucredit">积分</label>
        <input type="text" id="ucredit" onChange={(e) => setRank((prev) => ({ ...prev, ucredit: e.target.value }))} />
        <label htmlFor="ucourse">课程</label>
        <input type="text" id="ucourse" onChange={(e) => setRank((prev) => ({ ...prev, ucourse: e.target.value }))} />
        <label htmlFor="uclass">班级</label>
        <input type="text" id="uclass" onChange={(e) => setRank((prev) => ({ ...prev, uclass: e.target.value }))} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
