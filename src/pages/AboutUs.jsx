import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-black">
      <div className="max-w-4xl mx-auto px-5 sm:px-10 pt-28 sm:pt-40 pb-24 sm:pb-20 pointer-events-auto">
        <Link to="/" className="inline-block mb-8 sm:mb-10 font-mono text-xs tracking-widest text-[#a0a0a0] hover:text-[#e6e0d8] uppercase transition-colors">
          ← Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl font-light text-[#e6e0d8] mb-6 uppercase tracking-wide">
            ABOUT US
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
            <div>
              <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-[#c8c4c0] mb-6 sm:mb-8">
                ACEN is an architectural practice based in Tokyo, focusing on the essential qualities of space, light, and material.
              </p>
              <p className="font-serif text-[#a0a0a0] leading-relaxed">
                We believe that architecture should provide a silent backdrop for human life, stripping away the superfluous to reveal the fundamental poetic nature of the built environment.
              </p>
            </div>
            <div className="aspect-square bg-[#1a1715] border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop" alt="Studio" className="absolute inset-0 w-full h-full object-cover grayscale-[0.5]" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
