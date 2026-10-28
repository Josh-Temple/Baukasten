// GitHub Pages does not rewrite arbitrary paths to index.html. Fragment routes
// allow deep links, refresh, and browser history without extra hosting config.
export const HOME_HASH = '#/';
export const ABOUT_HASH = '#/about';

export function projectHref(projectId) {
  return `#/projects/${encodeURIComponent(projectId)}`;
}

export function resolveRoute(hash, projects) {
  const path = typeof hash === 'string' ? hash.replace(/^#/, '') : '';
  if (path === '' || path === '/') return { view: 'gallery', projectId: null };
  if (path === '/about' || path === '/about/') return { view: 'info', projectId: null };

  const projectMatch = /^\/projects\/([^/?#]+)\/?$/.exec(path);
  if (projectMatch) {
    try {
      const projectId = decodeURIComponent(projectMatch[1]);
      if (projects.some(project => project.id === projectId)) {
        return { view: 'project', projectId };
      }
    } catch {
      // Invalid percent-encoding is handled as a missing route below.
    }
  }
  return { view: 'not-found', projectId: null };
}
