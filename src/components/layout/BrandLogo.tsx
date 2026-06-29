import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  color?: string;
  className?: string;
}

const sizes = { sm: '1.5rem', md: '1.9rem', lg: '2.4rem', xl: '3rem' };

export function BrandLogo({ size = 'md', href = '/', color, className = '' }: BrandLogoProps) {
  const fontSize = sizes[size];
  const fontStyle: React.CSSProperties = {
    fontFamily: "'Savoye LET', 'Pinyon Script', cursive",
    fontSize,
    fontWeight: 400,
    letterSpacing: '0.01em',
    lineHeight: 1,
    display: 'inline-block',
  };

  const text = (
    <span style={{ ...fontStyle, color: color ?? 'inherit' }} className={className}>
      <span style={{ color: color ?? '#741353' }}>Event</span>
      <span style={{ color: color ?? '#E9409B' }}>Ease</span>
    </span>
  );

  if (!href) return text;
  return <Link href={href} style={{ textDecoration: 'none' }}>{text}</Link>;
}
