import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default PrivateRoute;



// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const token = localStorage.getItem("token");

//   // Validasi sederhana token
//   const isValidToken = () => {
//     if (!token) return false;
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.exp * 1000 > Date.now(); // Pastikan token belum expired
//     } catch {
//       return false;
//     }
//   };

//   return isValidToken() ? <Outlet /> : <Navigate to="/auth/sign-in" />;
// };

// export default PrivateRoute;
