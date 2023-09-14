module.exports = {
  siteMetadata: {
    siteUrl: 'https://sdgailab.org/',
    title: 'SDG AI Lab',
    description: 'SDG AI Lab Website',
    image: '',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-image',
    // 'gatsby-plugin-sharp',
    // 'gatsby-transformer-sharp',
  ],
};
