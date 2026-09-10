/** Current route as a clean, leading-slash path: `/`, `/about-us`, … */
export function routeOf(url: URL): string {
  return url.pathname.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
}
