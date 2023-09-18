module.exports = {
  siteMetadata: {
    siteUrl: 'https://sdgailab.org/',
    title: 'SDG AI Lab',
    description: 'SDG AI Lab Website',
    image: '',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-fontawesome-css',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images/`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'js',
        path: `${__dirname}/src/assets/js/`,
      },
    },
  ],
};
