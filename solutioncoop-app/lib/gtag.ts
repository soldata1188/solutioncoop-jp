// lib/gtag.ts — Google Analytics event tracking utility
// Sử dụng: import { trackEvent } from '@/lib/gtag'; trackEvent('cta_click', { label: 'contact_form' });

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Gửi custom event đến Google Analytics
 * @param action  - Tên hành động (ví dụ: 'cta_click', 'lead_magnet', 'form_submit')
 * @param params  - Thông tin bổ sung (label, value, etc.)
 */
export function trackEvent(
  action: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}
