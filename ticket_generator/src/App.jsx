import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketFormPage from "./pages/TicketFormPage";
import AllTicketsPage from "./pages/AllTicketsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="text-white bg-[#02191D] min-h-screen">
        <div className="py-4 w-[80%] mx-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<TicketFormPage />} />
            <Route path="/all-tickets" element={<AllTicketsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
