import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Project() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-stone-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-5 sm:px-10 pt-28 sm:pt-40 pb-24 sm:pb-20 pointer-events-auto">
        <Link to="/" className="inline-block mb-8 sm:mb-10 font-mono text-xs tracking-widest text-stone-500 dark:text-[#a0a0a0] hover:text-stone-900 dark:hover:text-[#e6e0d8] uppercase transition-colors">
          ← Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl font-light text-stone-900 dark:text-[#e6e0d8] mb-6 uppercase tracking-wide">
            PROJECT
          </h1>
          <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-stone-700 dark:text-[#c8c4c0] mb-8 max-w-2xl">
            A curated selection of our most significant works.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            <Link to="/project/obs-001-concrete" className="block group">
              <div className="aspect-[4/5] bg-stone-200 dark:bg-[#1a1715] border border-stone-300 dark:border-[rgba(255,255,255,0.05)] relative overflow-hidden flex flex-col justify-end group-hover:shadow-xl dark:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" alt="OBS-001 CONCRETE" className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-50/80 dark:from-black/80 to-transparent pointer-events-none" />
                <h3 className="font-mono text-xs tracking-widest text-stone-900 dark:text-[#e6e0d8] relative z-10 p-4 sm:p-6">OBS-001 CONCRETE</h3>
              </div>
            </Link>
            <Link to="/project/obs-002-glass" className="block group">
              <div className="aspect-[4/5] bg-stone-200 dark:bg-[#1a1715] border border-stone-300 dark:border-[rgba(255,255,255,0.05)] relative overflow-hidden flex flex-col justify-end group-hover:shadow-xl dark:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all">
                <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop" alt="OBS-002 GLASS" className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-50/80 dark:from-black/80 to-transparent pointer-events-none" />
                <h3 className="font-mono text-xs tracking-widest text-stone-900 dark:text-[#e6e0d8] relative z-10 p-4 sm:p-6">OBS-002 GLASS</h3>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
