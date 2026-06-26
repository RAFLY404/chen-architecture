import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/news';

// Note: Link is used inside the article cards below
import { getApiUrl, resolveImageUrl } from '../utils/api';

export default function WhatsOn() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl('/news'))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch news');
        return res.json();
      })
      .then((data) => {
        setArticles(data && data.length > 0 ? data : newsArticles);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news, falling back to mock data:', err);
        setArticles(newsArticles);
        setLoading(false);
      });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-[#fbfbfa] dark:bg-[#0c0a09] transition-colors duration-300 lg:pl-[300px]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-24 sm:pb-32 pointer-events-auto">

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <h1 className="font-karla text-sm sm:text-base tracking-[0.15em] text-black dark:text-[#e6e0d8] lowercase mb-10 sm:mb-14">
            what's on
          </h1>
        </motion.div>

        {/* News Grid (2 Columns on desktop/tablet, 1 Column on mobile, 3rem / 48px gap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-stone-200/60 dark:border-stone-800/20 pt-12 md:pt-16">
          {loading ? (
            <div className="col-span-2 text-center py-10 font-mono text-xs uppercase tracking-widest text-[#666]">Loading...</div>
          ) : (
            articles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className="group flex flex-col hover:-translate-y-[2px] transition-transform duration-300"
              >
              {/* Aspect Ratio 3:1 Thumbnail with 4px border radius */}
              <Link 
                to={`/what's on/${article.id}`} 
                className="block overflow-hidden rounded-[4px] mb-5 relative aspect-[3/1] bg-stone-100 dark:bg-[#151210] border border-stone-200/10 dark:border-stone-850/5"
              >
                {/* Visual architectural grid sketch pattern background */}
                <div 
                  className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen" 
                  style={{ 
                    backgroundImage: "url('/arch_sketch.png')", 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }} 
                />
                
                <img 
                  src={resolveImageUrl(article.heroImage)} 
                  alt={article.title}
                  className="w-full h-full object-cover filter grayscale-[0.05] group-hover:grayscale-0 transition-transform duration-[1.2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-105"
                  loading="lazy"
                />
              </Link>

              {/* Date / Metadata: Regular (400), 0.85rem (13.6px), grey #666666 */}
              <div className="font-karla text-[0.85rem] text-[#666666] dark:text-[#8a8580] uppercase mb-3 flex items-center gap-2">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-[#2c2825]" />
                <span>{article.readTime}</span>
              </div>

              {/* Title: Bold (700), 1.2rem (19.2px), default black/white, grey #666666 on hover */}
              <h2 className="font-karla text-[1.2rem] text-stone-900 dark:text-[#e6e0d8] group-hover:text-[#666666] dark:group-hover:text-stone-400 transition-colors duration-300 leading-snug mb-3">
                <Link to={`/what's on/${article.id}`}>
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt: Regular (400), 0.9rem (14.4px), line-height 1.6, charcoal #333333 */}
              <p className="font-karla text-[0.9rem] leading-[1.6] text-[#333333] dark:text-[#a0a0a0] mb-4 flex-grow">
                {article.excerpt}
              </p>

              {/* Read More link: Bold (700), uppercase, 0.85rem (13.6px), grey #666666 on hover */}
              <div>
                <Link 
                  to={`/what's on/${article.id}`}
                  className="inline-flex items-center font-karla uppercase text-[0.85rem] text-stone-900 dark:text-[#e6e0d8] group-hover:text-[#666666] dark:group-hover:text-stone-400 transition-colors duration-300"
                >
                  Read More <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.article>
          )))}
        </div>

      </div>
    </div>
  );
}
