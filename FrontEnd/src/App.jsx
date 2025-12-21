import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSleep from "./pages/AddSleep";
import SleepList from "./pages/SleepList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SleepList />} />
        <Route path="/add" element={<AddSleep />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
