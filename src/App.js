import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { supabase } from "./utils/api";
import TodoList from "./pages/TodoList/TodoList";
import Auth from "./pages/Auth";
import Error from "./pages/Error";
import Layout from "./pages/Layout";

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

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: session ? (
            <TodoList />
          ) : (
            <Navigate to="/auth/login" replace />
          ),
        },
        {
          element: <Auth />,
          path: "/auth",
          children: [
            { path: "login", element: <Auth /> },
            { path: "signup", element: <Auth /> },
            { path: "forgotpassword", element: <Auth /> },
          ],
        },
        // { path: "/*", element: <Error /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
