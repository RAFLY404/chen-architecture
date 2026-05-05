import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProjectDetails() {
  const { id } = useParams();

  // Mock project data based on the slug
  const title = id ? id.replace(/-/g, ' ').toUpperCase() : "PROJECT DETAILS";
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-black">
      <div className="max-w-4xl mx-auto px-10 pt-40 pb-20 pointer-events-auto">
        <Link to="/" className="inline-block mb-10 font-mono text-xs tracking-widest text-[#a0a0a0] hover:text-[#e6e0d8] uppercase transition-colors">
          ← Back to Board
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-editorial text-5xl md:text-7xl font-light text-[#e6e0d8] mb-6 uppercase tracking-wide">
            {title}
          </h1>
          
          <div className="flex space-x-8 mb-16 font-mono text-xs text-[#7a7570] tracking-widest uppercase border-b border-[rgba(255,255,255,0.1)] pb-6">
            <span>YEAR: 2026</span>
            <span>LOCATION: TOKYO, JP</span>
            <span>TYPOLOGY: CULTURAL</span>
          </div>

          <div className="aspect-[16/9] w-full bg-[#1a1715] mb-16 relative overflow-hidden shadow-2xl rounded-sm border border-[rgba(255,255,255,0.05)]">
             <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop" alt={title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h3 className="font-mono text-xs tracking-widest text-[#e6e0d8] uppercase mb-4">Design Concept</h3>
              <p className="font-serif text-lg md:text-xl leading-relaxed text-[#c8c4c0] mb-8">
                Located at the intersection of nature and brutalism, this project focuses on material honesty and volumetric balance. The interplay of light and shadow creates dynamic interiors that shift continuously throughout the day, guiding the inhabitants through a sequence of carefully curated spatial experiences.
              </p>
              <p className="font-serif text-lg md:text-xl leading-relaxed text-[#c8c4c0]">
                The structural grid was derived directly from the site's topographical constraints, allowing the architecture to act as an extension of the landscape rather than an imposition upon it.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-mono text-xs tracking-widest text-[#e6e0d8] uppercase mb-2">Materials</h3>
                <ul className="font-serif text-[#7a7570] space-y-1">
                  <li>Board-formed concrete</li>
                  <li>Oxidized corten steel</li>
                  <li>Reclaimed Japanese oak</li>
                  <li>Low-iron architectural glass</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-mono text-xs tracking-widest text-[#e6e0d8] uppercase mb-2">Team</h3>
                <ul className="font-serif text-[#7a7570] space-y-1">
                  <li>Lead Arch: ACEN Studio</li>
                  <li>Lighting: Lumina Grp</li>
                  <li>Struct: Kengo Eng.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
