import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { normalizeNavItems } from '../utils/api';
import SiteLogo from './SiteLogo';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSiteSettings();
  const navItems = normalizeNavItems(settings.navLabels);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 z-[70] pointer-events-auto">
        {/* Logo */}
        <a href="/" className={`hover:opacity-70 transition-opacity block ${isHome ? '' : 'lg:hidden'}`}>
          <SiteLogo className="h-7 sm:h-10 w-auto object-contain transition-all duration-300" />
        </a>

        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="group w-8 h-8 flex items-center justify-center rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
            aria-label="Toggle theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180">
              <circle cx="12" cy="12" r="10" className="stroke-current fill-none" strokeWidth="2" />
              <path d="M12 2a10 10 0 0 1 0 20z" className="fill-current" />
            </svg>
          </button>

          {/* Mobile & Tablet hamburger */}
          <button
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-black dark:bg-[#e6e0d8] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-black dark:bg-[#e6e0d8] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-black dark:bg-[#e6e0d8] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {isHome && (
          <div className="hidden lg:flex items-center">
            <button 
              onClick={toggleTheme}
              className="group w-8 h-8 flex items-center justify-center rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180">
                <circle cx="12" cy="12" r="10" className="stroke-current fill-none" strokeWidth="2" />
                <path d="M12 2a10 10 0 0 1 0 20z" className="fill-current" />
              </svg>
            </button>
          </div>
        )}
      </header>

      {/* Mobile & Tablet slide-down menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#f5f5f5]/95 dark:bg-black/95 backdrop-blur-md z-[65] flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="font-karla text-2xl tracking-[0.3em] uppercase text-black dark:text-[#e6e0d8] hover:opacity-60 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
