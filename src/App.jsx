import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BottomNavigation from "@/components/molecules/BottomNavigation";
import HomePage from "@/components/pages/HomePage";
import LogPage from "@/components/pages/LogPage";
import ProgressPage from "@/components/pages/ProgressPage";
import EmergencyPage from "@/components/pages/EmergencyPage";
import SettingsPage from "@/components/pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        
        <BottomNavigation />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;