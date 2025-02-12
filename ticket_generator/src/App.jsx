import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketFormPage from "./pages/TicketFormPage"
import TicketPage from "./pages/TicketPage";
import AllTicketsPage from "./pages/AllTicketsPage";
import AboutProjectPage from "./pages/AboutProjectPage";
import EventsPage from "./pages/EventsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="text-white bg-[#02191D] min-h-screen ">
        <div className="py-4 w-[90%] sm:w-[80%] mx-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/ticket-form" element={<TicketFormPage />} />
            <Route path="/ticket/:email" element={<TicketPage />} />
            <Route path="/all-tickets" element={<AllTicketsPage />} />
            <Route path="/about-project" element={<AboutProjectPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
