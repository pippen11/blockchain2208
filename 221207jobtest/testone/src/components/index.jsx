import { Routes, Route } from "react-router-dom";
import RegistAccount from "./registAccount";
import CompanyMain from "./CompanyMain";

export default function Components() {
  return (
    <Routes>
      <Route
        path="/registAccount/*"
        element={<RegistAccount></RegistAccount>}
      ></Route>
      <Route path="/companyMain" element={<CompanyMain></CompanyMain>}></Route>
    </Routes>
  );
}
