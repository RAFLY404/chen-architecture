import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useTheme } from '../ThemeContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { normalizeNavItems } from '../utils/api';

export default function Sidebar({ activePage }) {
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSiteSettings();
  const navItems = normalizeNavItems(settings.navLabels);

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[300px] bg-[#fbfbfa] dark:bg-[#0c0a09] border-r border-stone-200/30 dark:border-stone-800/40 px-8 py-10 flex flex-col justify-between hidden lg:flex z-50">
      <div>
        {/* Logo */}
        <Link to="/" className="hover:opacity-70 transition-opacity block mb-12">
          <img
            src={logo}
            alt="ACEN Architecture"
            className={`h-7 w-auto object-contain transition-all duration-300 ${theme === 'light' ? 'brightness-0' : 'brightness-0 invert'}`}
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const cleanLabel = item.label.toLowerCase();
            const cleanPath = item.path.slice(1).toLowerCase();
            const isActive = cleanLabel === activePage || cleanPath === activePage;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-karla text-[11px] tracking-[0.25em] uppercase transition-colors font-semibold ${
                  isActive 
                    ? 'text-stone-900 dark:text-[#e6e0d8]' 
                    : 'text-stone-400 hover:text-stone-900 dark:text-[#6b6661] dark:hover:text-[#e6e0d8]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-t border-stone-200/50 dark:border-stone-850/50 pt-4">
          <span className="font-karla text-[11px] tracking-[0.25em] transition-colors font-semibold text-stone-400 dark:text-[#6b6661]">THEME</span>
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
        <div className="font-karla text-[11px] tracking-[0.25em] transition-colors font-semibold text-stone-400 dark:text-[#6b6661]">
          Explore in: <span className="text-stone-900 dark:text-[#e6e0d8]">English</span>
        </div>
      </div>
    </aside>
  );
}
