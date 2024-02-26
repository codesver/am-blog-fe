import { Navigate, Route, Routes } from "react-router-dom";
import Auth, { Role } from "../core/Auth";

const AuthRouter = () => {
  return Auth.authenticated() ? (
    <Routes>
      <Route path="/admin" element={Auth.authorized(Role.ADMIN) ? <></> : <Navigate to={"/login"} />} />
    </Routes>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AuthRouter;
