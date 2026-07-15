/**
 * Determines whether Google ads should be displayed on a given route.
 * In compliance with Google AdSense Program Policies, ads must not be served on:
 * - Screens without publisher-content or with low-value content (e.g., privacy, terms, cookies, 404).
 * - Screens used for forms, alerts, navigation, or other behavioral/utility purposes (e.g., login, register, payment, subscription, appointment).
 * - Screens under construction or highly interactive gaming screens (e.g., active quiz gameplay).
 * 
 * @param {string} pathname - The current router path.
 * @returns {boolean} True if ads are allowed, false otherwise.
 */
export const shouldShowAds = (pathname) => {
  if (!pathname) return false;

  // Normalize path by removing trailing slash (except for root '/')
  const path = pathname.replace(/\/$/, '') || '/';

  // 1. Explicitly ALLOWED high-quality publisher content routes
  const allowedExact = [
    '/',               // Home page (has rich video bg, popular notes, stats, etc.)
    '/categories',     // Category index page (lists subjects, study guides)
    '/about',          // About us page (has detailed E-E-A-T background, teams, stats)
    '/tips',           // Study tips and resources hub

    '/quiz'            // Quiz home landing page (lists quiz categories and info)
  ];

  if (allowedExact.includes(path)) {
    return true;
  }

  // 2. Dynamic content pages that are allowed
  if (path.startsWith('/subject/')) {
    // Subject pages (e.g. /subject/physics) contain rich lists of chapters, PDFs, scientist quotes and study strategies
    return true;
  }

  if (path.startsWith('/tips/')) {
    // Detailed tip articles contain long-form text content
    return true;
  }

  // 3. Disallowed pages (Default fall-through)
  // This automatically blocks ads on:
  // - /register (registration/login form)
  // - /subscription (membership/bkash payment flow)
  // - /admin/payments (admin dashboard)
  // - /appointment (appointment booking form)
  // - /privacy, /terms, /cookies (low value policy documents)
  // - /quiz/start, /quiz/play, /quiz/result, /quiz/leaderboard (highly interactive gameplay loops, overlays, and status screens)
  // - * (unmatched NotFound/404 screens)
  return false;
};
