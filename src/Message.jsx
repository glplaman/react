import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Rank.css";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function () {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState({ title: "", desc: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await supabase.from("messages").insert([msg]).select();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);
    // console.log(msgs);
    setMsg({ title: "", desc: "" });
    setMsgs((prev) => [data, ...prev]);
    // console.log(msgs);
  };

  const deleteMsg = async (id) => {
    const { error, data } = await supabase.from("messages").delete().eq("id", id).select();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);

    setMsgs((prev) => prev.filter((item) => item.id !== data[0].id));
  };

  const getAll = async () => {
    const { error, data } = await supabase.from("messages").select().order("created_at", { ascending: false });
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);

    setMsgs(data);
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Message</h2>
        <label htmlFor="title">姓名</label>
        <input type="text" id="title" onChange={(e) => setMsg((prev) => ({ ...prev, title: e.target.value }))} />
        <label htmlFor="desc">留言</label>
        <input type="text" id="desc" onChange={(e) => setMsg((prev) => ({ ...prev, desc: e.target.value }))} />
        <button type="submit">submit</button>
      </form>
      <ul>
        {msgs.map((item, ind) => (
          <li key={item.id}>
            {ind + 1}:{item.title}-{item.desc} <div onClick={() => deleteMsg(item.id)}>delete</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
