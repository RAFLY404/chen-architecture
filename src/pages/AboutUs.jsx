import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useTheme } from '../ThemeContext';
import { getApiUrl, resolveImageUrl } from '../utils/api';

// Award / Recognition items
const RECOGNITIONS = [
  'Prix Versailles',
  'WAF Finalist',
  'AR Emerging Architecture',
  'Building of the Year',
  'Dezeen Awards',
  'IAI Design Award',
];

// Publications
const PUBLICATIONS = [
  'ArchDaily', 'Designboom', 'Gooood',
  'Architizer', 'STIR World', 'Superfuture',
  'Elle Decor', 'Dezeen', 'C3 Magazine',
  'Designverse', 'Indesignlive', 'Tecture Mag',
];

// Fallback Team members
const MOCK_TEAM_MEMBERS = [
  {
    name: 'Rafly Acen',
    role: 'Principal Architect',
    bio: 'Leads the design direction of ACEN, focusing on tropical spatial narratives and material honesty.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    instagram: '#',
  },
  {
    name: 'Alana Putri',
    role: 'Design Director',
    bio: 'Drives the conceptual framework across all projects, bridging culture and contemporary architectural practice.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    instagram: '#',
  },
  {
    name: 'Bima Candra',
    role: 'Senior Architect',
    bio: 'Specializes in structural integration and sustainable material research within the tropical context.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    instagram: '#',
  },
  {
    name: 'Nadia Reza',
    role: 'Urban Researcher',
    bio: 'Investigates the intersection of urbanism, public space, and community participation in Southeast Asian cities.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    instagram: '#',
  },
];

export default function AboutUs() {
  const { theme } = useTheme();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl('/team'))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team members');
        return res.json();
      })
      .then((data) => {
        setTeamMembers(data && data.length > 0 ? data : MOCK_TEAM_MEMBERS);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching team members, falling back to mock:', err);
        setTeamMembers(MOCK_TEAM_MEMBERS);
        setLoading(false);
      });
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-white dark:bg-[#0c0a09] transition-colors duration-300 lg:pl-[300px]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-0 pointer-events-auto">

        {/* Back Link */}
        <Link
          to="/"
          className="inline-block mb-10 font-karla text-xs tracking-[0.2em] text-[#666666] dark:text-[#8a8580] hover:text-black dark:hover:text-white uppercase transition-colors"
        >
          ← Back to Home
        </Link>

        {/* ───── SECTION 0: Hero & Narrative ───── */}
        <motion.section {...fadeUp} className="mb-20 md:mb-28">
          {/* Page Title */}
          <h1 className="font-karla text-sm sm:text-base tracking-[0.15em] text-black dark:text-[#e6e0d8] lowercase mb-10 sm:mb-14">
            about us
          </h1>

          {/* Hero Image */}
          <div className="w-full aspect-[16/9] md:aspect-[1580/1117] rounded-lg overflow-hidden mb-12 md:mb-16 relative bg-stone-100 dark:bg-[#151210]">
            <div
              className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
              style={{
                backgroundImage: "url('/arch_sketch.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
              alt="ACEN Studio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Narrative Text Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14">
            <p className="font-karla text-[0.95rem] sm:text-base leading-[1.8] text-[#222222] dark:text-[#c8c4c0]">
              ACEN (Architecture, Culture, Environment, Narrative) is a Jakarta-based group of architects, designers, and thinkers operating within the field of architecture, urbanism, research and development — which focuses on bringing the idea of Architecture as an art of utilizing space in the most provocative to utopian-research based approach.
            </p>
            <p className="font-karla text-[0.95rem] sm:text-base leading-[1.8] text-[#222222] dark:text-[#c8c4c0]">
              Formed from the curiosity of advancing Tropical Architecture, ACEN believes that in order to shape a better and more sustainable version of today's challenges, architecture can profitably be one of the most worth-exploring fields.
            </p>
          </div>

          {/* Full-width narrative block */}
          <p className="font-karla text-[0.95rem] sm:text-base leading-[1.8] text-[#222222] dark:text-[#c8c4c0] max-w-4xl">
            ACEN explores and experiments to redefine the value of architecture in both globalization and localization. Beyond spaces and building, it connects history, narrative of cultures, expanding beyond limits of what we call architecture. Collaboration of multidisciplinary expertise at each portfolio through systematic integration allows ACEN to always innovate and experiment.
          </p>
        </motion.section>

        {/* ───── SECTION 1: International Recognitions ───── */}
        <motion.section {...fadeUp} className="mb-16 md:mb-24">
          <h4 className="font-karla text-sm tracking-[0.15em] text-center text-black dark:text-[#e6e0d8] mb-8 md:mb-10">
            International Recognitions
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center px-4 sm:px-8">
            {RECOGNITIONS.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-16 sm:h-20 w-full border border-stone-200/60 dark:border-stone-800/30 rounded-md bg-stone-50 dark:bg-[#111110] px-3"
              >
                <span className="font-karla text-[10px] sm:text-xs tracking-[0.1em] text-[#555555] dark:text-[#8a8580] text-center uppercase leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───── SECTION 1.5: Team Members ───── */}
        <motion.section {...fadeUp} className="mb-16 md:mb-24">
          <h4 className="font-karla text-sm tracking-[0.15em] text-center text-black dark:text-[#e6e0d8] mb-2">
            The Team
          </h4>
          <p className="font-karla text-xs tracking-[0.08em] text-center text-[#999999] dark:text-[#6b6661] mb-10 md:mb-14">
            The minds behind the practice
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id || member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className="group flex flex-col"
              >
                {/* Portrait */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-stone-100 dark:bg-[#151210] mb-4">
                  <img
                    src={resolveImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Subtle dark gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Instagram link overlay on hover */}
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/90 dark:bg-stone-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm"
                    aria-label={`${member.name} Instagram`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-stone-800 dark:text-stone-200 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  </a>
                </div>

                {/* Role tag */}
                <span className="font-karla text-[9px] tracking-[0.18em] uppercase text-[#999999] dark:text-[#6b6661] mb-1">
                  {member.role}
                </span>

                {/* Name */}
                <h3 className="font-karla text-sm tracking-tight text-stone-900 dark:text-[#e6e0d8] mb-2 leading-tight">
                  {member.name}
                </h3>

                {/* Bio */}
                <p className="font-karla text-[11px] leading-[1.7] text-[#666666] dark:text-[#8a8580]">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ───── SECTION 2: Featured In ───── */}
        <motion.section {...fadeUp} className="mb-20 md:mb-28">
          <h4 className="font-karla text-sm tracking-[0.15em] text-center text-black dark:text-[#e6e0d8] mb-8 md:mb-10">
            Featured In
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 sm:gap-6 items-center justify-items-center px-4 sm:px-8">
            {PUBLICATIONS.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-14 sm:h-16 w-full border border-stone-200/60 dark:border-stone-800/30 rounded-md bg-stone-50 dark:bg-[#111110] px-3"
              >
                <span className="font-karla text-[10px] sm:text-xs tracking-[0.08em] text-[#555555] dark:text-[#8a8580] text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───── SECTION 3: Contact / Inquiry Columns ───── */}
        <motion.section {...fadeUp} className="mb-20 md:mb-28">
          <div className="w-full h-px bg-stone-200/80 dark:bg-stone-800/40 mb-12 md:mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 text-center">
            {/* Column 1: Project Inquiries */}
            <div className="flex flex-col items-center gap-3">
              <h5 className="font-karla text-sm tracking-[0.15em] text-[#222222] dark:text-[#e6e0d8]">
                Project Inquiries
              </h5>
              <a
                href="mailto:visionary@acen.archi"
                className="font-karla text-sm tracking-[0.05em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666666] dark:hover:text-white transition-colors underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700"
              >
                visionary@acen.archi
              </a>
            </div>

            {/* Column 2: Career & Team */}
            <div className="flex flex-col items-center gap-3 md:border-l md:border-stone-200/60 md:dark:border-stone-800/30">
              <h5 className="font-karla text-sm tracking-[0.15em] text-[#222222] dark:text-[#e6e0d8]">
                Career &amp; Team
              </h5>
              <p className="font-karla text-xs tracking-[0.05em] text-[#666666] dark:text-[#8a8580]">
                Architectural Designer &amp; Internship
              </p>
              <a
                href="mailto:studio@acen.archi"
                className="font-karla text-sm tracking-[0.05em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666666] dark:hover:text-white transition-colors underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700"
              >
                studio@acen.archi
              </a>
            </div>
          </div>
        </motion.section>

        {/* ───── SECTION 4: Centered Footer ───── */}
        <motion.section {...fadeUp} className="pb-16 md:pb-24">
          <div className="w-full h-px bg-stone-200/80 dark:bg-stone-800/40 mb-12 md:mb-16" />

          <div className="flex flex-col items-center gap-6 text-center">
            {/* Logo */}
            <img
              src={logo}
              alt="ACEN Architecture"
              className={`h-12 sm:h-16 w-auto object-contain ${theme === 'light' ? 'brightness-0' : 'brightness-0 invert'}`}
            />

            {/* Location & Social */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-karla text-sm tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0]">
                Jakarta — Ubud
              </span>
              <a
                href="https://www.instagram.com/acenarchitects/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-karla text-sm tracking-[0.05em] text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                @acenarchitects
              </a>
              <span className="font-karla text-xs tracking-[0.1em] text-[#999999] dark:text-[#6b6661] mt-1">
                © 2025
              </span>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
