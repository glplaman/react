import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import HelloWorld from "./HelloWorld";
// import "./App.css";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    console.log("init...");
    getAll();
    console.log("done...");
  }, []);
  async function getAll() {
    const { data, error } = await supabase.from("users").select();
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setUser(data);
  }
  return (
    <>
      <HelloWorld></HelloWorld>
      <ul>
        {user.map((item) => (
          <li key={item.email}>
            {item.email}
            {item.password}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
