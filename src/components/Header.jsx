import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useTheme } from '../ThemeContext';

const NAV_ITEMS = ["Project", "What's On", "About Us", "Contact Us"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 z-50 pointer-events-auto">
        {/* Logo */}
        <a href="/" className="hover:opacity-70 transition-opacity block">
          <img
            src={logo}
            alt="ACEN Architecture"
            className={`h-7 sm:h-10 w-auto object-contain transition-all duration-300 ${theme === 'light' ? 'brightness-0' : 'brightness-0 invert'}`}
          />
        </a>

        <div className="flex items-center gap-4 lg:hidden">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 dark:border-[rgba(255,255,255,0.2)] dark:text-[#e6e0d8] text-black"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
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

        {/* Theme Toggle for Desktop (if there was a desktop nav, we put it here, else just right align) */}
        <div className="hidden lg:flex items-center">
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 dark:border-[rgba(255,255,255,0.2)] dark:text-[#e6e0d8] text-black"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet slide-down menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#f5f5f5]/95 dark:bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-editorial text-2xl tracking-[0.3em] uppercase text-black dark:text-[#e6e0d8] hover:opacity-60 transition-opacity"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
