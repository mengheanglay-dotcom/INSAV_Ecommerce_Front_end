// React escapes text nodes by default. Keep this helper for places where we accept plain text.
export function safeText(value) {
  return String(value ?? "").replace(/[<>]/g, (ch) =>
    ch === "<" ? "&lt;" : "&gt;",
  );
}
export function isSafeUrl(value) {
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}
