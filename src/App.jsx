import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Project from './pages/Project';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import WhatsOn from './pages/WhatsOn';
import WhatsOnDetails from './pages/WhatsOnDetails';
import Sidebar from './components/Sidebar';

const getActivePage = (pathname) => {
  const cleanPath = decodeURIComponent(pathname).toLowerCase();
  if (cleanPath.startsWith('/project')) return 'project';
  if (cleanPath.startsWith("/what's on")) return "what's on";
  if (cleanPath.startsWith('/about us')) return 'about us';
  if (cleanPath.startsWith('/contact us')) return 'contact us';
  return '';
};

export default function App() {
  const location = useLocation();
  const activePage = getActivePage(location.pathname);
  const showSidebar = location.pathname !== '/';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f5f5f5] dark:bg-black selection:bg-black/10 dark:selection:bg-[#e6e0d8]/30 text-[#1a1715] dark:text-[#e6e0d8] transition-colors duration-300">
      <Header />
      {showSidebar && <Sidebar activePage={activePage} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/what's on" element={<WhatsOn />} />
        <Route path="/what's on/:id" element={<WhatsOnDetails />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
