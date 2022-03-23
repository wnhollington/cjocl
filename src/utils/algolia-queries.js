const indexName = `Pages`

const pageQuery = `{
  pages: allStrapiArticle {
    edges {
      node {
        slug
        title
        description
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { slug, title, description } }) {
  return {
    objectID: title,
    slug,
    description,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`description:20`] },
  },
]

module.exports = queries