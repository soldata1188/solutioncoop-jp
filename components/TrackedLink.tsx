'use client';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';

interface TrackedLinkProps {
  href: string;
  eventAction: string;
  eventLabel: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * Link component that automatically sends GA events when clicked.
 * Use this for important CTA buttons that you want to track.
 */
export default function TrackedLink({
  href,
  eventAction,
  eventLabel,
  className,
  target,
  rel,
  children,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventAction, {
      event_category: 'engagement',
      event_label: eventLabel,
    });
  };

  // External links or tel: links use <a>
  if (href.startsWith('tel:') || href.startsWith('http') || target === '_blank') {
    return (
      <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
        {children}
      </a>
    );
  }

  // Internal links use Next.js <Link>
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
