import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import logo from '../assets/logo.png';
import { useTheme } from '../ThemeContext';

export default function ProjectDetails() {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();

  // Normalization resolver to ensure double-clicks from the moodboard route correctly
  const getProject = () => {
    if (!id) return null;
    const clean = id.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Explicit mappings for moodboard polaroid labels
    if (clean === 'contextsite' || clean === 'lightingstudy' || clean === 'coredetail' || clean === 'chickenheropavilion') {
      return projects.find((p) => p.id === 'chicken-hero-pavilion');
    }
    if (clean === 'spatialvol' || clean === 'spatialvolume') {
      return projects.find((p) => p.id === 'spatial-volume');
    }
    if (clean === 'elevation04' || clean === 'obs002glass') {
      return projects.find((p) => p.id === 'obs-002-glass');
    }
    if (clean === 'obs001concrete') {
      return projects.find((p) => p.id === 'obs-001-concrete');
    }

    // Fallback search
    return projects.find((p) => {
      const pClean = p.id.replace(/[^a-z0-9]/g, '');
      return pClean === clean || pClean.includes(clean) || clean.includes(pClean);
    }) || projects[0];
  };

  const project = getProject();

  if (!project) {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#fbfbfa] dark:bg-[#0c0a09] z-50 text-stone-900 dark:text-[#e6e0d8]">
        <p className="font-mono text-sm tracking-widest uppercase mb-4">Project not found</p>
        <Link to="/project" className="font-mono text-xs underline uppercase tracking-widest">Back to Projects</Link>
      </div>
    );
  }

  // Gallery captions generator for context-rich details
  const getCaptionForImage = (projId, index) => {
    const captions = {
      'chicken-hero-pavilion': [
        'Exterior view of the porous timber canopy nestled inside Urban Forest Jakarta.',
        'The interior tunnel showing direct sunlight filtration through horizontal slats.',
        'Closer view of the sustainable chicken nesting beds and compost cycle zones.',
        'Symmetrical view of the structural frame blending with surrounding tree canopies.',
        'Sunset perspective showing the warm interior lighting bouncing off organic textures.'
      ],
      'obs-001-concrete': [
        'Board-formed concrete volumes cast against daylight.',
        'Light and shadow interaction highlighting material honesty in the main hall.',
        'The transition pathway connecting the cultural center to the outdoor gardens.'
      ],
      'obs-002-glass': [
        'Minimalist steel frame floating above the forest floor.',
        'Night view showing structural transparency and illuminated interior spaces.'
      ],
      'spatial-volume': [
        'Daylight studying across local pine frames and polycarbonate screens.',
        'Open air corridor encouraging passive cross ventilation.'
      ],
      'material-texture': [
        'Rammed earth wall details showing local soil grain layers.',
        'Petung bamboo arches forming the primary structure.'
      ],
      'geometry-space': [
        'Concrete louvers angled dynamically for seasonal solar control.',
        'Pocket garden courtyard introducing natural light deep into the workspaces.'
      ]
    };
    return captions[projId]?.[index] || `Project observation documentation slide ${index + 1}.`;
  };

  // Maps the project ID to its corresponding public drawing asset
  const getDiagramForProject = (projId) => {
    switch (projId) {
      case 'chicken-hero-pavilion':
        return '/chicken_diagram.png';
      case 'obs-001-concrete':
        return '/concrete_diagram.png';
      case 'obs-002-glass':
        return '/glass_diagram.png';
      default:
        return '/structure_diagram.png';
    }
  };

  // Renders the architectural specification list as a premium monograph spec card
  const renderSpecSheet = () => {
    return (
      <div className="bg-stone-50 dark:bg-stone-900/30 p-6 border border-stone-200/50 dark:border-stone-850/50 rounded-sm font-mono text-[9px] uppercase tracking-wider text-stone-700 dark:text-[#a8a4a0] space-y-4">
        <div className="font-bold border-b border-stone-200/50 dark:border-stone-850/50 pb-2 text-stone-900 dark:text-[#e6e0d8] flex justify-between">
          <span>SPECIFICATION DATA</span>
          <span className="text-[#e60023]">●</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-between border-b border-stone-100 dark:border-stone-800/40 pb-1">
            <span className="text-stone-400">PROJECT:</span> 
            <span className="text-stone-900 dark:text-[#e6e0d8] font-medium">{project.title}</span>
          </div>
          <div className="flex justify-between border-b border-stone-100 dark:border-stone-800/40 pb-1">
            <span className="text-stone-400">LOCATION:</span> 
            <span className="text-stone-900 dark:text-[#e6e0d8]">{project.location}</span>
          </div>
          <div className="flex justify-between border-b border-stone-100 dark:border-stone-800/40 pb-1">
            <span className="text-stone-400">YEAR:</span> 
            <span className="text-stone-900 dark:text-[#e6e0d8]">{project.year}</span>
          </div>
          <div className="flex justify-between border-b border-stone-100 dark:border-stone-800/40 pb-1">
            <span className="text-stone-400">TYPOLOGY:</span> 
            <span className="text-stone-900 dark:text-[#e6e0d8]">{project.typology}</span>
          </div>
          <div className="flex justify-between border-b border-stone-100 dark:border-stone-800/40 pb-1">
            <span className="text-stone-400">AREA:</span> 
            <span className="text-stone-900 dark:text-[#e6e0d8]">{project.area}</span>
          </div>
          <div className="flex justify-between border-b border-stone-100 dark:border-stone-800/40 pb-1">
            <span className="text-stone-400">CLIENT:</span> 
            <span className="text-stone-900 dark:text-[#e6e0d8]">{project.client}</span>
          </div>
          <div className="pt-2 border-t border-stone-200/30 dark:border-stone-800/30">
            <span className="text-stone-400 block mb-1">COLLABORATIVE TEAM:</span>
            <span className="leading-relaxed text-[8.5px] text-stone-600 dark:text-[#a8a4a0] block">{project.team}</span>
          </div>
          <div className="pt-2 border-t border-stone-200/30 dark:border-stone-800/30">
            <span className="text-stone-400 block mb-1.5">MATERIAL SPECIFICATION:</span>
            <ul className="space-y-1 pl-3 list-disc list-outside normal-case text-[8.5px] text-stone-600 dark:text-[#a8a4a0]">
              {project.materials.map(m => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const animProps = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-[60] bg-[#fbfbfa] dark:bg-[#0c0a09] selection:bg-stone-900/10 dark:selection:bg-white/10 flex flex-col lg:flex-row transition-colors duration-300">
      
      {/* LEFT SIDEBAR (Desktop Monograph Style) */}
      <aside className="fixed top-0 left-0 bottom-0 w-[300px] bg-[#fbfbfa] dark:bg-[#0c0a09] border-r border-stone-200/30 dark:border-stone-800/40 px-8 py-10 flex flex-col justify-between hidden lg:flex z-50">
        <div>
          {/* Logo */}
          <Link to="/" className="hover:opacity-70 transition-opacity block mb-12">
            <img
              src={logo}
              alt="ACEN Architecture"
              className={`h-7 w-auto object-contain transition-all duration-300 ${theme === 'light' ? 'brightness-0' : 'brightness-0 invert'}`}
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            {["Project", "What's On", "About Us", "Contact Us"].map((item) => {
              const path = `/${item.toLowerCase()}`;
              const isActive = item.toLowerCase() === 'project';
              return (
                <Link
                  key={item}
                  to={path}
                  className={`font-karla text-[11px] tracking-[0.25em] uppercase transition-colors font-semibold ${
                    isActive 
                      ? 'text-stone-900 dark:text-[#e6e0d8]' 
                      : 'text-stone-400 hover:text-stone-900 dark:text-[#6b6661] dark:hover:text-[#e6e0d8]'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-t border-stone-200/50 dark:border-stone-850/50 pt-4">
            <span className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661]">THEME</span>
            <button 
              onClick={toggleTheme}
              className="group w-8 h-8 flex items-center justify-center rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180">
                <circle cx="12" cy="12" r="10" className="stroke-current fill-none" strokeWidth="2" />
                <path d="M12 2a10 10 0 0 1 0 20z" className="fill-current" />
              </svg>
            </button>
          </div>
          <div className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
            Explore in: <span className="text-stone-800 dark:text-[#c8c4c0] font-semibold">English</span> 
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="w-full lg:pl-[300px] px-6 sm:px-10 lg:px-16 pt-28 sm:pt-40 lg:pt-20 pb-10 lg:pb-20 flex-grow font-karla">
        
        {/* Breadcrumb / Section header */}
        <div className="flex justify-between items-center mb-10 sm:mb-16 border-b border-stone-200/50 dark:border-stone-850/50 pb-4">
          <Link 
            to="/project" 
            className="font-mono text-[10px] tracking-[0.25em] text-stone-500 dark:text-[#8a8580] hover:text-stone-900 dark:hover:text-[#e6e0d8] uppercase transition-colors"
          >
            ← Back to Archive
          </Link>
          <span className="font-mono text-[9px] tracking-[0.3em] text-stone-400 dark:text-[#555] uppercase hidden sm:inline">
            CASE STUDY // {project.id.toUpperCase()}
          </span>
        </div>

        {/* ROW 1: Hero & Intro Paragraph (Asymmetric 75% / 25% Split) */}
        <motion.section {...animProps(0.1)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 lg:mb-24">
          <div className="lg:col-span-9 overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
            <img 
              src={project.heroImage} 
              alt={project.title} 
              className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[1s]"
            />
          </div>
          <div className="lg:col-span-3 space-y-4">
            <h1 className="font-karla text-base font-bold text-stone-900 dark:text-[#e6e0d8] leading-tight uppercase tracking-tight">
              {project.title}
            </h1>
            <div className="font-mono text-[9px] tracking-[0.2em] text-stone-400 dark:text-[#6b6661] uppercase leading-relaxed">
              {project.subtitle}
            </div>
            <div className="h-px w-8 bg-stone-900 dark:bg-[#e6e0d8] my-2" />
            <p className="text-[10px] leading-[1.65] text-stone-700 dark:text-[#c8c4c0] text-justify">
              {project.paragraphs[0]}
            </p>
          </div>
        </motion.section>

        {/* ROW 2: Diagram & Secondary Paragraph (Asymmetric 33% / 67% Split) */}
        <motion.section {...animProps(0.15)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 lg:mb-24">
          <div className="lg:col-span-4 space-y-4">
            {project.paragraphs[1] && (
              <p className="text-[10px] leading-[1.65] text-stone-750 dark:text-[#c8c4c0] text-justify">
                {project.paragraphs[1]}
              </p>
            )}
            {project.paragraphs[2] && (
              <p className="text-[10px] leading-[1.65] text-stone-750 dark:text-[#c8c4c0] text-justify">
                {project.paragraphs[2]}
              </p>
            )}
          </div>
          <div className="lg:col-span-8 space-y-3">
            <div className="overflow-hidden bg-stone-50 dark:bg-[#110f0e] border border-stone-200/30 dark:border-stone-850/30 rounded-sm p-4 md:p-8 flex items-center justify-center">
              <img 
                src={getDiagramForProject(project.id)} 
                alt={`${project.title} Structural Diagram`} 
                className="w-full h-auto max-h-[60vh] object-contain filter dark:brightness-100 transition-all duration-[1s] hover:scale-[1.01]"
              />
            </div>
            <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
              Fig. D-01 // Structural / Infographic Diagram
            </p>
          </div>
        </motion.section>

        {/* ROW 3: Staggered Side-by-Side Images (Equal 50% / 50% Split with Stagger) */}
        {project.images && project.images.length >= 2 && (
          <motion.section {...animProps(0.2)} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16 lg:mb-24">
            <div className="space-y-3">
              <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                <img 
                  src={project.images[0]} 
                  alt={`${project.title} doc 01`} 
                  className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s] hover:scale-[1.015]"
                />
              </div>
              <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                Fig. 01 // {getCaptionForImage(project.id, 0)}
              </p>
            </div>
            <div className="space-y-3 md:mt-16">
              <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                <img 
                  src={project.images[1]} 
                  alt={`${project.title} doc 02`} 
                  className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s] hover:scale-[1.015]"
                />
              </div>
              <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                Fig. 02 // {getCaptionForImage(project.id, 1)}
              </p>
            </div>
          </motion.section>
        )}

        {/* ROW 4: Large Photo & Sub-text (Asymmetric 67% / 33% Split) */}
        <motion.section {...animProps(0.25)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 lg:mb-24">
          <div className="lg:col-span-8 space-y-3">
            {project.images && project.images.length >= 3 ? (
              <>
                <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                  <img 
                    src={project.images[2]} 
                    alt={`${project.title} doc 03`} 
                    className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s] hover:scale-[1.01]"
                  />
                </div>
                <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                  Fig. 03 // {getCaptionForImage(project.id, 2)}
                </p>
              </>
            ) : (
              <div className="h-px bg-stone-200/30 dark:bg-stone-800/30 w-full" />
            )}
          </div>
          <div className="lg:col-span-4 space-y-4 lg:pt-6">
            {project.paragraphs[3] && (
              <p className="text-[10px] leading-[1.65] text-stone-750 dark:text-[#c8c4c0] text-justify">
                {project.paragraphs[3]}
              </p>
            )}
            {project.paragraphs[4] && (
              <p className="text-[10px] leading-[1.65] text-stone-750 dark:text-[#c8c4c0] text-justify">
                {project.paragraphs[4]}
              </p>
            )}
          </div>
        </motion.section>

        {/* ROW 5: Gallery Ending & Spec Sheet (Adapts based on images count) */}
        <motion.section {...animProps(0.3)}>
          {(() => {
            const imgCount = project.images ? project.images.length : 0;

            if (imgCount >= 5) {
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16 lg:mb-24">
                  <div className="space-y-3">
                    <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                      <img 
                        src={project.images[3]} 
                        alt={`${project.title} doc 04`} 
                        className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s]"
                      />
                    </div>
                    <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                      Fig. 04 // {getCaptionForImage(project.id, 3)}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                      <img 
                        src={project.images[4]} 
                        alt={`${project.title} doc 05`} 
                        className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s]"
                      />
                    </div>
                    <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                      Fig. 05 // {getCaptionForImage(project.id, 4)}
                    </p>
                  </div>
                  <div>
                    {renderSpecSheet()}
                  </div>
                </div>
              );
            } else if (imgCount === 4) {
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16 lg:mb-24">
                  <div className="space-y-3">
                    <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                      <img 
                        src={project.images[3]} 
                        alt={`${project.title} doc 04`} 
                        className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s]"
                      />
                    </div>
                    <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                      Fig. 04 // {getCaptionForImage(project.id, 3)}
                    </p>
                  </div>
                  <div className="hidden md:block h-48 border-l border-dashed border-stone-200 dark:border-stone-800/40 relative">
                    <span className="absolute top-4 left-4 font-mono text-[8px] text-stone-400">INTENTIONAL VACANCY //</span>
                  </div>
                  <div>
                    {renderSpecSheet()}
                  </div>
                </div>
              );
            } else {
              // 2-column layout for remaining projects
              const displayImg = imgCount >= 2 ? project.images[imgCount - 1] : project.heroImage;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 lg:mb-24">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="overflow-hidden bg-stone-100 dark:bg-[#151210] border border-stone-200/30 dark:border-stone-850/30 rounded-sm">
                      <img 
                        src={displayImg} 
                        alt={`${project.title} details`} 
                        className="w-full h-auto object-cover filter grayscale-[0.05] hover:grayscale-0 transition-all duration-[0.8s] hover:scale-[1.01]"
                      />
                    </div>
                    <p className="font-mono text-[9px] tracking-wider text-stone-400 dark:text-[#6b6661] uppercase">
                      Fig. {String(imgCount).padStart(2, '0')} // Final structural study
                    </p>
                  </div>
                  <div className="lg:col-span-4">
                    {renderSpecSheet()}
                  </div>
                </div>
              );
            }
          })()}
        </motion.section>

        {/* BOTTOM NAV BAR */}
        <div className="border-t border-stone-200/50 dark:border-stone-850/50 pt-8 flex justify-between items-center mt-12 mb-6">
          <Link 
            to="/project" 
            className="font-mono text-[10px] tracking-[0.25em] text-stone-500 dark:text-[#8a8580] hover:text-stone-900 dark:hover:text-[#e6e0d8] uppercase transition-colors"
          >
            ← Back to Archive
          </Link>
          <span className="font-mono text-[9px] text-stone-400 dark:text-[#6b6661] tracking-wider uppercase">
            ACEN STUDIO © {project.year}
          </span>
        </div>

      </main>
    </div>
  );
}
