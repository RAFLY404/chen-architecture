import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <nav className="absolute bottom-0 left-0 p-10 z-50 flex flex-col space-y-4 pointer-events-auto">
        {['Portfolio', 'Contact', 'Journal'].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="font-editorial text-xs tracking-[0.4em] uppercase text-[#e6e0d8] hover:underline hover:underline-offset-4 transition-all opacity-80 hover:opacity-100"
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 right-0 p-10 z-50 pointer-events-auto">
        <div className="font-mono text-[10px] tracking-widest text-[#7a7570] flex items-center space-x-4">
          <button className="hover:text-[#e6e0d8] transition-colors border-b border-[#7a7570] hover:border-[#e6e0d8] pb-0.5">ACEN ARCHITECTURE</button>
        </div>
      </div>
    </>
  );
}
