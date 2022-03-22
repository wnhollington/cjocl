const escapeStringRegexp = require("escape-string-regexp")

const indexName = `Pages`

const pageQuery = `{
  pages: allStrapiArticle {
    edges {
      node {
        id
        slug
        title
        description
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, slug, title, description } }) {
  return {
    objectID: id,
    ...slug,
    ...title,
    ...description,
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