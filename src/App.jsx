import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Footer from "./Footer";
import Login from "./Login";
import Message from "./Message";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const curSession = await supabase.auth.getSession();
    console.log(curSession);
    setSession(curSession.data.session);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    fetchSession();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <>
      {session ? (
        <>
          <p>Welcome</p>
          <button type="button" onClick={logout}>
            quit
          </button>
          <Message session={session}></Message>
        </>
      ) : (
        <Login></Login>
      )}
      <Footer></Footer>
    </>
  );
}

export default App;
