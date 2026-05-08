import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      {/* Footer nav — hidden on mobile (nav is in Header hamburger) */}
      <nav className="hidden md:flex absolute bottom-0 left-0 p-10 z-50 flex-col space-y-4 pointer-events-auto">
        {["Project", "What's On", "About Us", "Contact Us"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="font-editorial text-xs tracking-[0.4em] uppercase text-[#e6e0d8] hover:underline hover:underline-offset-4 transition-all opacity-80 hover:opacity-100"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Bottom right copyright — always visible but shrinks on mobile */}
      <div className="absolute bottom-0 right-0 p-4 sm:p-10 z-50 pointer-events-auto">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#7a7570] flex items-center">
          <button className="hover:text-[#e6e0d8] transition-colors border-b border-[#7a7570] hover:border-[#e6e0d8] pb-0.5">
            ACEN ARCHITECT
          </button>
        </div>
      </div>
    </>
  );
}
