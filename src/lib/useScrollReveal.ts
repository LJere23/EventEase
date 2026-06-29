import { useEffect, RefObject } from 'react';

/**
 * Reveals child elements matching `selector` when the `sectionRef` enters the
 * viewport. Elements are visible by default and only animate if JS runs — so
 * there is never a permanent "stuck invisible" state.
 */
export function useScrollReveal(
  sectionRef: RefObject<HTMLElement | null>,
  selector: string,
  { staggerMs = 100, durationMs = 600, yPx = 28, threshold = 0.12 } = {}
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>(selector));
    if (!cards.length) return;

    // Set initial hidden state
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = `translateY(${yPx}px)`;
      card.style.transition = 'none';
    });

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.transition = `opacity ${durationMs}ms ease, transform ${durationMs}ms ease`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * staggerMs);
      });
    };

    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { reveal(); observer.disconnect(); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(section);

    // Hard fallback: show after 1.5 s regardless
    const fallback = setTimeout(() => { reveal(); observer.disconnect(); }, 1500);

    return () => { clearTimeout(fallback); observer.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
