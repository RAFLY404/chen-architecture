import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Contact() {
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
            CONTACT
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <p className="font-serif text-lg md:text-xl leading-relaxed text-[#c8c4c0] mb-8">
                For inquiries, collaborations, or to discuss a new project, please reach out to us.
              </p>
              <ul className="font-mono text-sm tracking-widest text-[#7a7570] space-y-4">
                <li><a href="mailto:hello@acen.archi" className="hover:text-[#e6e0d8] transition-colors">HELLO@ACEN.ARCHI</a></li>
                <li>+81 3 1234 5678</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-widest text-[#e6e0d8] uppercase mb-4">TOKYO STUDIO</h3>
              <p className="font-serif text-[#7a7570] leading-relaxed">
                Minato City,<br />
                Tokyo, Japan<br />
                106-0032
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
