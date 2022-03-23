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
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { slug, title, description, category } }) {
  return {
    objectID: title,
    title,
    slug,
    description,
    category
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