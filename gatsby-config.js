require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteUrl: `https://example.com`,
    description: `test`,
    title: `title`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-bootstrap-5`,
        short_name: `gb5-starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    'gatsby-plugin-dark-mode',
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.API_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: ['page', 'article', 'category', 'writer'],
        singleTypes: ['global']
      },
    },
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allStrapiArticle } }) => {
              return allStrapiArticle.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.description,
                  date: edge.node.created_at,
                  url: `${site.siteMetadata.siteUrl}/${edge.node.category.slug}/${edge.node.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${edge.node.category.slug}/${edge.node.slug}`,
                  // custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allStrapiArticle {
                  edges {
                    node {
                      title
                      description
                      createdAt(formatString: "DD MMMM,YYYY")
                      slug
                      category {
                        slug
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
  ],
}
