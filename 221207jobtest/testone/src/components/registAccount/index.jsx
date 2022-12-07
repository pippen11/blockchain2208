import { Routes, Route } from "react-router-dom";
import CompanyContainer from "./company/CompanyContainer";

export default function RegistAccount() {
  return (
    <div>
      <Routes>
        <Route
          path="/company"
          element={<CompanyContainer></CompanyContainer>}
        ></Route>
      </Routes>
    </div>
  );
}
