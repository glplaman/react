import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Message.css";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function Message({ session }) {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState({ title: "", desc: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await supabase.from("messages").insert({ ...msg, email: session.user.email });
    // .select()
    // .single();
    if (error) {
      console.error(error.message);
      return;
    }
    setMsg({ title: "", desc: "" });
    // insert 后的更新，由订阅实现
    // setMsgs((prev) => [data, ...prev]);
    e.target.reset();
  };

  const deleteByEmail = async (id) => {
    const { error, data } = await supabase.from("messages").delete().eq("id", id);
    // .select();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);
    // delete 后的更新，由订阅实现
    // setMsgs((prev) => prev.filter((item) => item.id !== data[0].id));
  };

  const getAll = async () => {
    const { error, data } = await supabase.from("messages").select().order("created_at", { ascending: false });
    if (error) {
      console.error(error.message);
      return;
    }
    setMsgs(data);
  };

  const updateByEmail = async () => {
    const { error, data } = await supabase.from("messages").update({ title: "hi,there" }).eq("desc", "hi").select();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const ch = supabase.channel("msg");
    ch.on("postgres_changes", { event: "insert", schema: "public", table: "messages" }, (payload) => {
      const newmsg = payload.new;
      setMsgs((prev) => [newmsg, ...prev]);
    });
    ch.on("postgres_changes", { event: "delete", schema: "public", table: "messages" }, (payload) => {
      const deletedTaskId = payload.old.id;
      setMsgs((prev) => prev.filter((task) => task.id !== deletedTaskId));
    });
    ch.subscribe((sta) => console.log(sta));
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Message</h2>
        <label htmlFor="title">姓名</label>
        <input type="text" id="title" onChange={(e) => setMsg((prev) => ({ ...prev, title: e.target.value }))} autoFocus />
        <label htmlFor="desc">留言</label>
        <input type="text" id="desc" onChange={(e) => setMsg((prev) => ({ ...prev, desc: e.target.value }))} />
        <button type="submit">submit</button>
      </form>
      <ul>
        {msgs.map((item, ind) => (
          <li key={item.id}>
            <span>
              {ind + 1}. {item.title}：{item.desc}
              {item.email}
            </span>
            <button type="button" onClick={() => deleteByEmail(item.id)}>
              Del
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
