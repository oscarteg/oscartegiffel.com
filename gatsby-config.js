module.exports = {
  siteMetadata: {
    title: `Oscar te Giffel`,
    description: `This is my homepage for all my projects and blog posts`,
    contactEmail: `oscar@tegiffel.com`,
    siteUrl: `https://oscartegiffel.com`,
    logo: `logo.png`,
    repo: `https://github.com/oscarteg/homepage`,
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
      },
      {
        name: `Blog`,
        link: `/blog`,
        partiallyActive: true,
      },
      {
        name: `About`,
        link: `/about`,
      },
      {
        name: `Projects`,
        link: `/projects`,
      },
      {
        name: `Books`,
        link: `/books`,
      },
      {
        name: `Uses`,
        link: `/uses`,
      },
      {
        name: `Glossary`,
        link: `/blog/tags/glossary`,
      },
    ],
    socialLinks: [
      {
        name: `Gitlab`,
        url: `https://gitlab.com/oscarteg`,
        icon: `gitlab`,
      },
      {
        name: `Resume`,
        url: `https://resume.oscartegiffel.com`,
        icon: `file-code`,
      },
      {
        name: `Instagram`,
        url: `https://instagram.com/oscartegiffel`,
        icon: `instagram`,
      },
      {
        name: `Linkedin`,
        url: `https://www.linkedin.com/in/otegiffel/`,
        icon: `linkedin`,
      },
      {
        name: `Twitter`,
        url: `https://twitter.com/oscartegiffel`,
        icon: `twitter`,
      },
      {
        name: `Github`,
        url: `https://github.com/oscarteg`,
        icon: `github`,
      },
    ],
  },
  plugins: [
    `@oscarteg/gatsby-theme-deepmind`,
    {
      resolve: `@oscarteg/gatsby-theme-blog-core`,
      options: {
        postsPerPage: 10,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-61119473-9`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Oscar te Giffel - Homepage`,
        short_name: `oscartegiffel`,
        start_url: `/`,
        background_color: `#f8fafc`,
        theme_color: `#f2d024`,
        display: `standalone`,
        // icon: `content/assets/images/profile.jpg`, // This path is relative to the root of the site.
      },
    },
  ],
};
