import { Route, Routes } from "react-router-dom";
import In from "./In";
import Out from "./Out";

function Log() {
  return (
    <div>
      Log!
      <Routes>
        <Route path="/in/:userid" element={<In />} />
        {/* userid로 받겠다 다른걸로 써도됨 */}
        <Route path="/out" element={<Out />} />
      </Routes>
    </div>
  );
}

export default Log;
