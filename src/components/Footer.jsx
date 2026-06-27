import { Link, useLocation } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { normalizeNavItems } from '../utils/api';

export default function Footer() {
  const location = useLocation();
  const { settings } = useSiteSettings();
  const navItems = normalizeNavItems(settings.navLabels);
  const isHome = location.pathname === '/';

  if (!isHome) return null;

  return (
    <>
      {/* Footer nav — hidden on mobile (nav is in Header hamburger) */}
      <nav className="hidden lg:flex absolute bottom-0 left-0 p-10 z-50 flex-col space-y-2 pointer-events-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="font-karla text-[10px] tracking-[0.2em] lowercase text-stone-900 dark:text-[#e6e0d8] hover:underline hover:underline-offset-4 transition-all opacity-80 hover:opacity-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
