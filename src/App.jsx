import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Project from './pages/Project';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import WhatsOn from './pages/WhatsOn';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f5f5f5] dark:bg-black selection:bg-black/10 dark:selection:bg-[#e6e0d8]/30 text-[#1a1715] dark:text-[#e6e0d8] transition-colors duration-300">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/what's on" element={<WhatsOn />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
