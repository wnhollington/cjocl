const indexName = `Pages`

const pageQuery = `{
  pages: allStrapiArticle {
    edges {
      node {
        slug
        title
        description
        category {
          slug
          name
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { slug, title, description, category, image } }) {
  return {
    objectID: title,
    title,
    slug,
    description,
    category,
    image
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { 
      attributesToSnippet: [`description:20`],
      attributesForFaceting: [`category.name`]
    },
  },
]

module.exports = queries