import { Routes, Route } from "react-router-dom";
import RegistAccount from "./registAccount";

export default function Components() {
  return (
    <Routes>
      <Route
        path="/registAccount/*"
        element={<RegistAccount></RegistAccount>}
      ></Route>
    </Routes>
  );
}
