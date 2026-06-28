import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function () {
  const [ranks, setRanks] = useState([]);
  const [info, setInfo] = useState({ age: 18, gender: "male" });
  useEffect(() => {
    getRanks();
  }, []);

  async function getRanks() {
    const { error, data } = await supabase.from("ranks").select();
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setRanks(data);
  }
  const deleteRank = (id) => console.log(id);
  const setAge = () => {};

  return (
    <>
      <ul>
        {Object.entries(info).map(([key, value]) => (
          <li key={key} onClick={() => setInfo((e) => ({ ...e, age: value + 1 }))}>
            {key}-{value}
          </li>
        ))}
      </ul>
      {!ranks || ranks.length == 0 ? (
        <p>数据为空</p>
      ) : (
        <ul>
          {ranks.map((item) => (
            <li key={item.id} onClick={() => deleteRank(item.id)}>
              {item.name}
              {item.credit}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
