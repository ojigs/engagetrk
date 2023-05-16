import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
// import Headers from "./components/Header";
// import Footer from "./components/Footer";
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

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: session ? <TodoList /> : <Navigate to="/login" />,
  //     errorElement: <Error />,
  //   },
  //   {
  //     path: "/auth",
  //     element: <Auth />,
  //     children: [
  //       // { path: "/", element: <Navigate to="/auth/login" /> },
  //       { path: "login", element: <Auth /> },
  //       { path: "signup", element: <Auth /> },
  //       { path: "forgotpassword", element: <Auth /> },
  //     ],
  //   },
  // ]);

  const router = createBrowserRouter([
    {
      path: "",
      element: session ? <TodoList /> : <Navigate to="/auth/login" />,
      errorElement: <Error />,
      // Add children property for nested routes under TodoList
      children: [
        // Add a default subroute for TodoList
        { path: "", element: <TodoList /> },
        // Add more subroutes for TodoList if needed
      ],
    },
    {
      path: "/auth",
      // Add redirectTo prop for Auth
      element: <Auth redirectTo="/" />,
      children: [
        { path: "", element: <Navigate to="/auth/login" /> },
        { path: "login", element: <Auth /> },
        { path: "signup", element: <Auth /> },
        { path: "forgotpassword", element: <Auth /> },
      ],
    },
    // Add a trailing slash to the * path
    { path: "/*", element: <Error /> },
  ]);

  return (
    <div className="App">
      <Layout />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
