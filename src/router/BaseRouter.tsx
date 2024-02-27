import { Route, Routes } from "react-router-dom";
import TestPage from "../pages/TestPage";

const BaseRouter = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default BaseRouter;
