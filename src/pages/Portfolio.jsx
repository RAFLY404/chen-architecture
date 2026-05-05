import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-black">
      <div className="max-w-4xl mx-auto px-10 pt-40 pb-20 pointer-events-auto">
        <Link to="/" className="inline-block mb-10 font-mono text-xs tracking-widest text-[#a0a0a0] hover:text-[#e6e0d8] uppercase transition-colors">
          ← Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-editorial text-5xl md:text-7xl font-light text-[#e6e0d8] mb-6 uppercase tracking-wide">
            PORTFOLIO
          </h1>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-[#c8c4c0] mb-8 max-w-2xl">
            A curated selection of our most significant works.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/project/obs-001-concrete" className="block group">
              <div className="aspect-[4/5] bg-[#1a1715] border border-[rgba(255,255,255,0.05)] relative overflow-hidden flex flex-col justify-end group-hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" alt="OBS-001 CONCRETE" className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <h3 className="font-mono text-xs tracking-widest text-[#e6e0d8] relative z-10 p-6">OBS-001 CONCRETE</h3>
              </div>
            </Link>
            <Link to="/project/obs-002-glass" className="block group">
              <div className="aspect-[4/5] bg-[#1a1715] border border-[rgba(255,255,255,0.05)] relative overflow-hidden flex flex-col justify-end group-hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all">
                  <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop" alt="OBS-002 GLASS" className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <h3 className="font-mono text-xs tracking-widest text-[#e6e0d8] relative z-10 p-6">OBS-002 GLASS</h3>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
