import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../utils/api";

function ProtectedRoute({ element, fallback, ...rest }) {
  const session = supabase.auth.getSession();
  return (
    <Routes>
      <Route
        {...rest}
        element={session ? element : fallback || <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default ProtectedRoute;
