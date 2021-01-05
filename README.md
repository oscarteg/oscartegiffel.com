[![Netlify Status](https://api.netlify.com/api/v1/badges/8d9e8857-241b-4014-a933-d0bc5f5b0a39/deploy-status)](https://app.netlify.com/sites/oscartegiffel/deploys)

# oscartegiffel.com

My portfolio has transformed over the years - from a static HTML site, to Jekyll, to Hugo, and finally to Next.js/React/MDX. My personal slice of the internet provides a platform for my writing and to showcase my latest work.

## Overview

- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://oscartegiffel.com/dashboard), newsletter subscription, and post views.
- `pages/blog/*` - Static pre-rendered blog pages using [MDX](https://github.com/mdx-js/mdx).
- `pages/dashboard` - [Personal dashboard](https://oscartegiffel.com/dashboard) containing metrics like sales, views, and subscribers.
- `pages/*` - All other static pages.

## Running Locally

```bash
$ git clone https://github.com/oscarteg/oscartegiffel.com
$ cd oscartegiffel.com
$ yarn
$ yarn dev
```

Create a `.env.local` file similar to [`.env.example`](https://github.com/oscarteg/oscartegiffel.com/blob/master/.env.example).

## Built Using

- [Next.js](https://nextjs.org/)
- [MDX](https://github.com/mdx-js/mdx)
- [Tailwind CSS](https://tailwindcss.com/)
