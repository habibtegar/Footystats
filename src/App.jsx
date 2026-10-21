import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import "./App.css";

function App() {
  const [selectedLeague, setSelectedLeague] = useState("PL");
  const [activeSection, setActiveSection] = useState("matches");

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                selectedLeague={selectedLeague}
                onSelectLeague={setSelectedLeague}
                activeSection={activeSection}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
