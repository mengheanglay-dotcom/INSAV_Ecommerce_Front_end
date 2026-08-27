// HTTP security headers are enforced by Laravel. This file documents the frontend policy.
export const frontendSecurityPolicy =
  "default-src 'self'; img-src 'self' data: https://fakestoreapi.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://localhost:8000 https://fakestoreapi.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'";
