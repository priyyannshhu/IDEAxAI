import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/react-app/pages/Landing";
import Generator from "@/react-app/pages/Generator";
import About from "@/react-app/pages/About";
import HowItWorks from "@/react-app/pages/HowItWorks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}
