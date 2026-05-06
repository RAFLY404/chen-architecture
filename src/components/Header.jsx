import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const NAV_ITEMS = ["Project", "What's On", "About Us", "Contact Us"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 z-50 pointer-events-auto">
        {/* Logo */}
        <a href="/" className="hover:opacity-70 transition-opacity block">
          <img
            src={logo}
            alt="ACEN Architecture"
            className="h-7 sm:h-10 w-auto object-contain brightness-0 invert"
          />
        </a>

        {/* Desktop nav — top right */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="font-editorial text-xs tracking-[0.3em] uppercase text-[#e6e0d8] hover:underline hover:underline-offset-4 transition-all opacity-70 hover:opacity-100"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#e6e0d8] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-[#e6e0d8] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-[#e6e0d8] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-editorial text-2xl tracking-[0.3em] uppercase text-[#e6e0d8] hover:opacity-60 transition-opacity"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
