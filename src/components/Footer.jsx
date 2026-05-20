import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      {/* Footer nav — hidden on mobile (nav is in Header hamburger) */}
      <nav className="hidden lg:flex absolute bottom-0 left-0 p-10 z-50 flex-col space-y-2 pointer-events-auto">
        {["Project", "What's On", "About Us", "Contact Us"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="font-editorial text-[10px] tracking-[0.2em] lowercase text-stone-900 dark:text-[#e6e0d8] hover:underline hover:underline-offset-4 transition-all opacity-80 hover:opacity-100"
          >
            {item}
          </Link>
        ))}
      </nav>
    </>
  );
}
