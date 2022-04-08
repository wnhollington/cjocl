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
          title
        }
        createdAt(formatString: "MMMM DD, YYYY")
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

function pageToAlgoliaRecord({ node: { slug, title, description, category, createdAt, image } }) {
  return {
    objectID: title,
    title,
    slug,
    description,
    category,
    createdAt,
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