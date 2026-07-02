import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  color?: string;
  className?: string;
}

const fontSizes = { sm: '1.5rem', md: '1.9rem', lg: '2.4rem', xl: '3rem' };

export function BrandLogo({ size = 'md', href = '/', color, className = '' }: BrandLogoProps) {
  const fontSize = fontSizes[size];
  const fontStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
    fontSize,
    fontWeight: 700,
    fontStyle: 'italic',
    letterSpacing: '0.04em',
    lineHeight: 1,
    display: 'inline-block',
  };

  const text = (
    <span style={{ ...fontStyle }} className={className}>
      <span style={{ color: color ?? '#741353' }}>Event</span>
      <span style={{ color: color ?? '#E9409B' }}>Ease</span>
    </span>
  );

  if (!href) return text;
  return <Link href={href} style={{ textDecoration: 'none' }}>{text}</Link>;
}
