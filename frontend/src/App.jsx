import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatPage from "./pages/CreatPage";
import DetailPage from "./pages/DetailPage";
import { useEffect } from "react";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#FFF5F7_40%,#FBCFE8_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatPage />} />
        <Route path="/note/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
