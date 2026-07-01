import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
import "./Register.css";
export default function () {
  const [uemail, setUemail] = useState("");
  const [upass, setUpass] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: uemail,
      password: upass,
    });
    if (error) {
      console.error(error.message);
      return;
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Your email" onChange={(e) => setUemail(e.target.value)} required />
        <input type="password" placeholder="Your pass" onChange={(e) => setUpass(e.target.value)} required />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
