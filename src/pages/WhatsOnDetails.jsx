import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { newsArticles } from '../data/news';
import { getApiUrl, resolveImageUrl } from '../utils/api';

export default function WhatsOnDetails() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when article changes
  useEffect(() => {
    const pageContainer = document.getElementById('details-page-container');
    if (pageContainer) {
      pageContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

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

  // Find current article
  const currentIndex = articles.findIndex((art) => art.id === id);
  const article = articles[currentIndex];

  if (loading) {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#fbfbfa] dark:bg-[#0c0a09] z-40 text-stone-900 dark:text-[#e6e0d8]">
        <div className="font-mono text-xs uppercase tracking-widest text-[#666]">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#fbfbfa] dark:bg-[#0c0a09] z-40 text-stone-900 dark:text-[#e6e0d8]">
        <h2 className="font-karla text-3xl mb-4">Article Not Found</h2>
        <Link to="/what's on" className="font-karla text-sm uppercase tracking-wider underline">
          Back to What's On
        </Link>
      </div>
    );
  }

  // Find next/prev articles
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div 
      id="details-page-container"
      className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-[#fbfbfa] dark:bg-[#0c0a09] selection:bg-stone-900/10 dark:selection:bg-white/10 flex flex-col transition-colors duration-300 lg:pl-[300px]"
    >
      {/* MAIN CONTENT AREA */}
      <main className="w-full flex-grow font-karla">
        <div className="max-w-[800px] mx-auto px-6 sm:px-10 pt-28 sm:pt-40 pb-24 sm:pb-32 pointer-events-auto">
          
          {/* Navigation / Breadcrumb */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <Link 
              to="/what's on" 
              className="font-karla text-[10px] sm:text-xs tracking-[0.25em] text-[#666666] dark:text-[#8a8580] hover:text-black dark:hover:text-white uppercase transition-colors"
            >
              ← Back to What's On
            </Link>
            <span className="font-karla text-[10px] tracking-[0.25em] text-stone-400 dark:text-[#524e4a] uppercase">
              Journal / Article
            </span>
          </div>

          {/* Article Header */}
          <motion.header 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-karla text-[0.75rem] tracking-widest text-[#666666] dark:text-[#8a8580] uppercase">
              <span>{article.date}</span>
              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
              <span>By {article.author}</span>
              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="font-karla text-3xl sm:text-4xl md:text-[2.6rem] text-stone-900 dark:text-[#e6e0d8] leading-[1.2] tracking-tight mb-6">
              {article.title}
            </h1>

            <div className="w-full h-px bg-stone-200/60 dark:bg-stone-800/40" />
          </motion.header>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden mb-10 bg-stone-100 dark:bg-[#151210] border border-stone-200/10 dark:border-stone-850/5"
          >
            {/* Subtle architectural grid sketch pattern background */}
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
              className="w-full h-full object-cover filter grayscale-[0.05]"
            />
          </motion.div>

          {/* Article Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="prose prose-stone dark:prose-invert max-w-none mb-16"
          >
            {article.paragraphs && article.paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className="font-karla text-[1rem] sm:text-[1.05rem] text-[#333333] dark:text-[#c7c2bb] leading-[1.75] mb-6 tracking-wide"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-stone-200/60 dark:bg-stone-800/40 mb-8" />

          {/* Bottom Post Navigation */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 text-xs font-karla tracking-widest uppercase"
          >
            {/* Prev Link */}
            <div className="text-left">
              {prevArticle ? (
                <Link 
                  to={`/what's on/${prevArticle.id}`} 
                  className="group inline-flex flex-col text-stone-500 dark:text-[#8a8580] hover:text-black dark:hover:text-white transition-colors max-w-full"
                >
                  <span className="text-[10px] text-stone-400 dark:text-[#524e4a] mb-1">Previous Article</span>
                  <span className="text-stone-900 dark:text-[#e6e0d8] group-hover:text-[#666666] dark:group-hover:text-stone-400 transition-colors line-clamp-1">
                    ← {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <span className="text-stone-300 dark:text-stone-800 select-none block">
                  <span className="text-[10px] mb-1 block">Previous Article</span>
                  —
                </span>
              )}
            </div>

            {/* Next Link */}
            <div className="text-right">
              {nextArticle ? (
                <Link 
                  to={`/what's on/${nextArticle.id}`} 
                  className="group inline-flex flex-col items-end text-stone-500 dark:text-[#8a8580] hover:text-black dark:hover:text-white transition-colors max-w-full"
                >
                  <span className="text-[10px] text-stone-400 dark:text-[#524e4a] mb-1">Next Article</span>
                  <span className="text-stone-900 dark:text-[#e6e0d8] group-hover:text-[#666666] dark:group-hover:text-stone-400 transition-colors line-clamp-1 text-right">
                    {nextArticle.title} →
                  </span>
                </Link>
              ) : (
                <span className="text-stone-300 dark:text-stone-800 select-none block text-right">
                  <span className="text-[10px] mb-1 block">Next Article</span>
                  —
                </span>
              )}
            </div>
          </motion.nav>

        </div>
      </main>
    </div>
  );
}
