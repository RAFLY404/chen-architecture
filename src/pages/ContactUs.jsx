import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl } from '../utils/api';
import { useSiteSettings } from '../hooks/useSiteSettings';

const initialForm = {
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
};

export default function ContactUs() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const titleOptions = settings.formTitleOptions?.length ? settings.formTitleOptions : ['Mr.', 'Mrs.', 'Ms.'];
  const helpTypeOptions = settings.formHelpTypeOptions?.length
    ? settings.formHelpTypeOptions
    : ['Project Inquiry', 'Collaboration', 'Press', 'Other'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitState.status !== 'idle') setSubmitState({ status: 'idle', message: '' });
  };

  const handleFiles = (incoming) => {
    const newFiles = [...files, ...Array.from(incoming || [])].slice(0, 5);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ status: 'idle', message: '' });

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });
      files.forEach((file) => {
        payload.append('attachments', file);
      });

      const response = await fetch(getApiUrl('/contact'), {
        method: 'POST',
        body: payload,
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your message right now.');
      }

      setForm(initialForm);
      setFiles([]);
      setSubmitState({
        status: 'success',
        message: result.message || 'Thank you! Your message has been submitted.',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Unable to submit your message right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };

  const inputBase =
    'w-full font-karla text-sm bg-white dark:bg-[#111110] border border-stone-200 dark:border-stone-800/50 text-[#222222] dark:text-[#e6e0d8] placeholder:text-stone-400 dark:placeholder:text-[#555] px-4 py-3 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors';

  return (
    <div className="absolute inset-0 w-full h-full overflow-y-auto z-40 bg-white dark:bg-[#0c0a09] transition-colors duration-300 lg:pl-[300px]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 pointer-events-auto">
        <motion.h1
          {...fadeUp}
          className="font-karla text-sm sm:text-base tracking-[0.15em] text-black dark:text-[#e6e0d8] lowercase mb-8 sm:mb-10"
        >
          {settings.contactSectionTitle || 'contact us'}
        </motion.h1>

        {settings.contactHeroText && (
          <motion.p
            {...fadeUp}
            className="max-w-2xl font-karla text-sm sm:text-base leading-[1.8] text-[#555555] dark:text-[#a8a4a0] mb-12 sm:mb-16"
          >
            {settings.contactHeroText}
          </motion.p>
        )}

        <motion.section {...fadeUp} className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            <div className="flex flex-col gap-2 md:pr-12">
              <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                Project Inquiries :
              </span>
              <a
                href={`mailto:${settings.emailInquiry}`}
                className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666] dark:hover:text-white transition-colors underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700"
              >
                {settings.emailInquiry}
              </a>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                  Instagram:
                </span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666] dark:hover:text-white transition-colors"
                >
                  {settings.instagramHandle}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:pl-12 md:border-l md:border-stone-200/60 md:dark:border-stone-800/30">
              <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                General & Career :
              </span>
              <a
                href={`mailto:${settings.emailGeneral}`}
                className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8] hover:text-[#666] dark:hover:text-white transition-colors underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700"
              >
                {settings.emailGeneral}
              </a>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-karla text-xs tracking-[0.12em] text-[#999999] dark:text-[#6b6661]">
                  Phone:
                </span>
                <span className="font-karla text-sm tracking-[0.04em] text-[#222222] dark:text-[#e6e0d8]">
                  {settings.phone}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-stone-200/80 dark:bg-stone-800/40 mb-14 md:mb-20" />

        <motion.form {...fadeUp} onSubmit={handleSubmit} className="space-y-6">
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
                <option value="">-</option>
                {titleOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
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
              <option value="">Select...</option>
              {helpTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

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

            {files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-2 bg-stone-100 dark:bg-[#151210] border border-stone-200 dark:border-stone-800/50 rounded px-3 py-1.5"
                  >
                    <span className="font-karla text-xs text-[#222] dark:text-[#c8c4c0] truncate max-w-[160px]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="text-stone-400 hover:text-red-500 transition-colors text-sm leading-none"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {submitState.message && (
            <div
              className={`font-karla text-sm rounded-md border px-4 py-3 ${
                submitState.status === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-300'
                  : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300'
              }`}
            >
              {submitState.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-karla text-sm tracking-[0.15em] uppercase py-4 rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-[#222] dark:hover:bg-stone-200 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </motion.form>

        <div className="h-16" />
      </div>
    </div>
  );
}
