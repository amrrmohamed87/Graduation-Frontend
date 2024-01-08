import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
}
