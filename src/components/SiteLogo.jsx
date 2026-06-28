import logo from '../assets/logo.png';
import { useTheme } from '../ThemeContext';
import { resolveImageUrl } from '../utils/api';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function SiteLogo({ className = '' }) {
  const { theme } = useTheme();
  const { settings } = useSiteSettings();
  const src = settings.logoUrl ? resolveImageUrl(settings.logoUrl) : logo;
  const tintClass = settings.logoUrl ? '' : theme === 'light' ? 'brightness-0' : 'brightness-0 invert';

  return (
    <img
      src={src}
      alt={settings.studioName || 'ACEN Architecture'}
      className={`${className} ${tintClass}`.trim()}
    />
  );
}
