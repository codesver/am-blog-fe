import { Navigate, Route, Routes } from "react-router-dom";
import Auth, { Role } from "../core/Auth";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={Auth.authorized(Role.ADMIN) ? <></> : <Navigate to={"/login"} replace />} />
    </Routes>
  );
};

export default AuthRouter;
