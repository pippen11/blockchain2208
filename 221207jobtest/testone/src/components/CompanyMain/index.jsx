import { Routes, Route } from "react-router-dom";
import CompanyMainContainer from "./CompanyMain/CompanyMainContainer";

export default function CompanyMain() {
  return (
    <Routes>
      <Route
        path="/"
        element={<CompanyMainContainer></CompanyMainContainer>}
      ></Route>
    </Routes>
  );
}
