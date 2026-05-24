import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { getApiUrl, resolveImageUrl } from '../utils/api';

export default function Project() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypology, setSelectedTypology] = useState('ALL');

  useEffect(() => {
    fetch(getApiUrl('/projects'))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((data) => {
        setProjectsList(data && data.length > 0 ? data : projects);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects, falling back to mock data:', err);
        setProjectsList(projects);
        setLoading(false);
      });
  }, []);

  // Extract unique typologies
  const typologies = ['ALL', ...new Set(projectsList.map((p) => p.typology).filter(Boolean))];

  // Filter projects
  const filteredProjects = selectedTypology === 'ALL'
    ? projectsList
    : projectsList.filter((p) => p.typology === selectedTypology);

  // Define beautiful aspect ratios to ensure a staggered masonry effect
  const getAspectRatioClass = (id) => {
    switch (id) {
      case 'chicken-hero-pavilion':
        return 'aspect-[3/4]'; // Tall portrait
      case 'obs-001-concrete':
        return 'aspect-[16/10]'; // Horizontal
      case 'obs-002-glass':
        return 'aspect-[4/5]'; // Moderate portrait
      case 'spatial-volume':
        return 'aspect-square'; // Square
      case 'material-texture':
        return 'aspect-[3/2]'; // Wide horizontal
      case 'geometry-space':
        return 'aspect-[4/5]'; // Moderate portrait
      default:
        return 'aspect-[4/5]';
    }
  };


  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-[#fbfbfa] dark:bg-[#0c0a09] lg:pl-[300px] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-28 sm:pt-40 pb-24 sm:pb-20 pointer-events-auto">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-block mb-10 font-karla text-xs tracking-[0.2em] text-stone-500 dark:text-[#8a8580] hover:text-stone-900 dark:hover:text-[#e6e0d8] uppercase transition-colors"
        >
          ← Back to Board
        </Link>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="font-karla text-xs tracking-[0.3em] uppercase text-stone-400 dark:text-[#6b6661] block mb-3">
            ARCHIVE / PORTFOLIO
          </span>
          <h1 className="font-karla text-5xl sm:text-6xl md:text-8xl text-stone-900 dark:text-[#e6e0d8] leading-none uppercase tracking-wide">
            PROJECTS
          </h1>
          <div className="h-px w-20 bg-stone-900 dark:bg-[#e6e0d8] mt-6 mb-8" />
          <p className="font-karla text-stone-600 dark:text-[#a8a4a0] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
            A comprehensive catalog of architectural structures, volumetric studies, and spatial concepts exploring tropical climate design and material truth.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 border-b border-stone-200 dark:border-[rgba(255,255,255,0.06)] pb-4 overflow-x-auto flex scrollbar-none"
        >
          <div className="flex gap-6 sm:gap-10 pr-6 min-w-max">
            {typologies.map((typology) => (
              <button
                key={typology}
                onClick={() => setSelectedTypology(typology)}
                className={`font-karla text-xs tracking-[0.2em] uppercase pb-2 relative transition-colors duration-300 ${
                  selectedTypology === typology
                    ? 'text-stone-900 dark:text-[#e6e0d8]'
                    : 'text-stone-400 dark:text-[#6b6661] hover:text-stone-600 dark:hover:text-[#a8a4a0]'
                }`}
              >
                {typology}
                {selectedTypology === typology && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-px bg-stone-900 dark:bg-[#e6e0d8]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        <motion.div 
          layout 
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                className="break-inside-avoid mb-6 group relative bg-transparent overflow-hidden"
              >
                <Link to={`/project/${project.id}`} className="block">
                  
                  {/* Image wrapper */}
                  <div className={`w-full overflow-hidden bg-stone-100 dark:bg-[#151210] relative rounded-2xl border border-stone-200/20 dark:border-stone-800/10 ${getAspectRatioClass(project.id)}`}>
                    
                    {/* Sketch pattern background for loading/visual flavor */}
                    <div 
                      className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen" 
                      style={{ 
                        backgroundImage: "url('/arch_sketch.png')", 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }} 
                    />

                    <img 
                      src={resolveImageUrl(project.heroImage)} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-[1.025] filter grayscale-[0.15] group-hover:grayscale-0"
                      loading="lazy"
                    />

                    {/* Pinterest Hover Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none z-10">
                      {/* Top bar: Red Save-style Button */}
                      <div className="flex justify-end w-full">
                        <span className="bg-[#e60023] hover:bg-[#ad081b] text-white font-karla text-[10px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-md pointer-events-auto transition-colors duration-200">
                          OPEN
                        </span>
                      </div>
                      
                      {/* Bottom bar */}
                      <div className="flex justify-between items-center w-full">
                        <span className="font-karla text-[9px] tracking-wider text-white/95 uppercase bg-black/45 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                          {project.location.split(',')[0]}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-white/95 dark:bg-stone-900/95 flex items-center justify-center text-stone-850 dark:text-[#e6e0d8] border border-white/20 shadow-xs font-karla text-xs">
                          ↗
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="pt-3 pb-2 px-1">
                    <h3 className="font-karla text-sm tracking-tight text-stone-900 dark:text-[#e6e0d8] group-hover:underline transition-all duration-300 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center mt-2">
                      {/* Creator badge */}
                      <div className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-[9px] font-karla text-stone-700 dark:text-stone-300 mr-2">
                        A
                      </div>
                      <span className="font-karla text-xs text-stone-600 dark:text-stone-400">
                        ACEN Studio
                      </span>
                      <span className="ml-auto font-karla text-[9px] text-stone-400 dark:text-stone-500">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}

