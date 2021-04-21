const title = 'Oscar te Giffel – Developer, writer, creator.';
const description =
  'Front-end developer, JavaScript enthusiast, and course creator.';

export default {
  title,
  description,
  canonical: 'https://oscartegiffel.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://oscartegiffel.com',
    title,
    description,
    images: [
      {
        url: 'https://oscartegiffel.com/static/images/banner.jpg',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: '@oscartegiffel',
    site: '@oscartegiffel',
    cardType: 'summary_large_image',
  },
};
