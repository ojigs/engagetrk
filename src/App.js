import { useState, useEffect } from "react";
import "./App.css";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import { supabase } from "./utils/api";
import TodoList from "./pages/TodoList/TodoList";
import Auth from "./pages/Auth";

function App() {
  const [session, setSession] = useState(supabase.auth.getSession());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      {!session ? (
        <Auth />
      ) : (
        <>
          <Headers session={session} />
          <TodoList session={session} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
