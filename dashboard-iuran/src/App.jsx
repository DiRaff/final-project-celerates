import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Route root akan memeriksa token */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard/home" replace /> : <Navigate to="/auth/sign-in" replace />
        }
      />
      <Route path="/auth/*" element={<Auth />} />
      {/* Proteksi rute dashboard dengan PrivateRoute */}
      <Route path="/dashboard/*" element={<PrivateRoute />}>
        <Route path="*" element={<Dashboard />} />
      </Route>
      {/* Redirect semua rute yang tidak valid */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
