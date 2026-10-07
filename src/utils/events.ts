/** Opens the global Login / Register popup from anywhere (handled in AppLayout). */
export const OPEN_AUTH_EVENT = "vini:open-auth";
export const openAuth = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_AUTH_EVENT));
};
