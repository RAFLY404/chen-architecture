import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function WhatsOn() {
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
            WHAT'S ON
          </h1>
          <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-stone-700 dark:text-[#c8c4c0] mb-8 sm:mb-12 max-w-2xl">
            Thoughts on architecture, materials, light, and the intersection of space and time.
          </p>
          <div className="space-y-10 sm:space-y-12 border-t border-stone-200 dark:border-[rgba(255,255,255,0.1)] pt-10 sm:pt-12">
            <article className="group cursor-pointer">
              <p className="font-mono text-[10px] tracking-widest text-stone-500 dark:text-[#7a7570] mb-2">OCTOBER 12, 2026</p>
              <h2 className="font-editorial text-xl sm:text-2xl text-stone-900 dark:text-[#e6e0d8] group-hover:text-black dark:group-hover:text-white transition-colors mb-3 sm:mb-4">The Brutal Honesty of Cast Concrete</h2>
              <p className="font-serif text-stone-600 dark:text-[#a0a0a0] text-sm sm:text-base">An exploration of formwork textures and how they capture the memory of construction...</p>
            </article>
            <article className="group cursor-pointer">
              <p className="font-mono text-[10px] tracking-widest text-stone-500 dark:text-[#7a7570] mb-2">SEPTEMBER 04, 2026</p>
              <h2 className="font-editorial text-xl sm:text-2xl text-stone-900 dark:text-[#e6e0d8] group-hover:text-black dark:group-hover:text-white transition-colors mb-3 sm:mb-4">Light as a Structural Element</h2>
              <p className="font-serif text-stone-600 dark:text-[#a0a0a0] text-sm sm:text-base">How we use natural illumination to define spatial boundaries without physical walls...</p>
            </article>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
