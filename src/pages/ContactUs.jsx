import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postCode: '',
    company: '',
    location: '',
    helpType: '',
    subject: '',
    message: '',
  });
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (incoming) => {
    const newFiles = [...files, ...Array.from(incoming)].slice(0, 5);
    setFiles(newFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (idx) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder — wire up to backend later
    alert('Thank you! Your message has been submitted.');
  };

  const fadeUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };

  // Shared input styles
  const inputBase =
    'w-full font-karla text-sm bg-white dark:bg-[#111110] border border-stone-200 dark:border-stone-800/50 text-[#222222] dark:text-[#e6e0d8] placeholder:text-stone-400 dark:placeholder:text-[#555] px-4 py-3 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors';

  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-white dark:bg-[#0c0a09] transition-colors duration-300 lg:pl-[300px]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 pointer-events-auto">


        {/* ───── Page Title ───── */}
        <motion.h1
          {...fadeUp}
          className="font-karla text-sm sm:text-base tracking-[0.15em] text-black dark:text-[#e6e0d8] lowercase mb-12 sm:mb-16"
        >
          contact us
        </motion.h1>

        {/* ───── Contact Info Columns ───── */}
        <motion.section {...fadeUp} className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            {/* Column 1 */}
            <div className="flex flex-col gap-2 md:pr-12">
              <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                Project Inquiries :
              </span>
              <a
                href="mailto:visionary@acen.archi"
                className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666] dark:hover:text-white transition-colors underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700"
              >
                visionary@acen.archi
              </a>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                  Instagram:
                </span>
                <a
                  href="https://www.instagram.com/acenarchitects/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666] dark:hover:text-white transition-colors"
                >
                  @acenarchitects
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 md:pl-12 md:border-l md:border-stone-200/60 md:dark:border-stone-800/30">
              <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                General & Career :
              </span>
              <a
                href="mailto:studio@acen.archi"
                className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666] dark:hover:text-white transition-colors underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700"
              >
                studio@acen.archi
              </a>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                  Phone:
                </span>
                <span className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8]">
                  +62 21 1234 5678
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Divider ───── */}
        <div className="w-full h-px bg-stone-200/80 dark:bg-stone-800/40 mb-14 md:mb-20" />

        {/* ───── Contact Form ───── */}
        <motion.form {...fadeUp} onSubmit={handleSubmit} className="space-y-6">

          {/* Row 1: Title / First Name / Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr_1fr] gap-4">
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Title <span className="text-red-500 text-[10px]">(required)</span>
              </label>
              <select
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className={inputBase + ' appearance-none cursor-pointer'}
              >
                <option value="">—</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                First Name <span className="text-red-500 text-[10px]">(required)</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
          </div>

          {/* Row 2: Email / Phone / Post Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Email Address <span className="text-red-500 text-[10px]">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Phone Number <span className="text-red-500 text-[10px]">(required)</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Post Code <span className="text-red-500 text-[10px]">(required)</span>
              </label>
              <input
                type="text"
                name="postCode"
                required
                value={form.postCode}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
          </div>

          {/* Row 3: Company / Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            <div>
              <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
                Company Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
          </div>

          {/* Row 4: What can we help you? */}
          <div>
            <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
              What can we help you?
            </label>
            <select
              name="helpType"
              value={form.helpType}
              onChange={handleChange}
              className={inputBase + ' appearance-none cursor-pointer'}
            >
              <option value="">Select…</option>
              <option value="Project Inquiry">Project Inquiry</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Press">Press</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Row 5: Subject */}
          <div>
            <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
              Subject <span className="text-red-500 text-[10px]">(required)</span>
            </label>
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Row 6: Message */}
          <div>
            <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
              Message <span className="text-red-500 text-[10px]">(required)</span>
            </label>
            <textarea
              name="message"
              required
              rows="7"
              value={form.message}
              onChange={handleChange}
              className={inputBase + ' resize-none'}
            />
          </div>

          {/* Row 7: File Upload */}
          <div>
            <label className="font-karla text-xs tracking-[0.1em] text-[#222222] dark:text-[#c8c4c0] mb-1.5 block">
              Upload supporting documents (site photos, plot, etc)
            </label>
            <div
              className={`relative w-full min-h-[140px] flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed transition-colors cursor-pointer ${
                dragActive
                  ? 'border-black dark:border-white bg-stone-100 dark:bg-[#1a1715]'
                  : 'border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#111110]'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <span className="font-karla text-sm text-[#222222] dark:text-[#c8c4c0]">
                Drag & Drop Files Here
              </span>
              <span className="font-karla text-xs text-[#999] dark:text-[#6b6661]">
                or <span className="text-blue-600 dark:text-blue-400 underline underline-offset-2">Browse Files</span>
              </span>
              <span className="absolute top-3 right-4 font-karla text-[11px] tracking-[0.08em] text-[#999] dark:text-[#6b6661]">
                {files.length} of 5
              </span>
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-stone-100 dark:bg-[#151210] border border-stone-200 dark:border-stone-800/50 rounded px-3 py-1.5"
                  >
                    <span className="font-karla text-xs text-[#222] dark:text-[#c8c4c0] truncate max-w-[160px]">
                      {f.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      className="text-stone-400 hover:text-red-500 transition-colors text-sm leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Row 8: Submit */}
          <button
            type="submit"
            className="w-full font-karla text-sm tracking-[0.15em] uppercase py-4 rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-[#222] dark:hover:bg-stone-200 transition-colors duration-300"
          >
            Submit
          </button>
        </motion.form>

        {/* Bottom spacer */}
        <div className="h-16" />
      </div>
    </div>
  );
}
