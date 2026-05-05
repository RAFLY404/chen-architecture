import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Portfolio from './pages/Portfolio';
import Studio from './pages/Studio';
import Contact from './pages/Contact';
import Journal from './pages/Journal';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black selection:bg-[#e6e0d8]/30 text-[#e6e0d8]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
