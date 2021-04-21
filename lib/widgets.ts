import globby from 'globby';

export async function getWidgets() {
  // Get all widgets
  const widgets = await globby('pages/widgets/*.js', {
    onlyFiles: true,
  });

  return widgets
    .filter(widget => widget !== 'pages/widgets/index.js')
    .map(page => {
      const name = page
        .replace('/', '')
        .replace('.js', '')
        .replace('pages', '')
        .replace('widgets', '');

      const path = page
        .replace('pages', '')
        .replace('data', '')
        .replace('.js', '')
        .replace('.mdx', '');

      const route = path === '/widgets/index' ? '' : path;

      return {
        name: name,
        route,
      };
    });
}
