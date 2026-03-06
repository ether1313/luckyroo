/** Height of the sticky navbar (h-16 = 4rem). Used for scroll offset so content is not hidden under the header. */
export const NAVBAR_OFFSET_PX = 64;

/**
 * Smoothly scrolls the window so that the given element is in view, accounting for the fixed navbar.
 * Use for in-page targets (e.g. pagination list top).
 */
export function scrollToElement(
  element: HTMLElement | null,
  options: { behavior?: ScrollBehavior } = {}
): void {
  if (!element) return;
  const { behavior = 'smooth' } = options;
  const top =
    element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/**
 * Smoothly scrolls the page to the top. Use after route changes (navbar clicks).
 */
export function scrollToTop(options: { behavior?: ScrollBehavior } = {}): void {
  const { behavior = 'smooth' } = options;
  window.scrollTo({ top: 0, behavior });
}
