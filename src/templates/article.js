import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown"
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout'

// Render
const Article = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const title = data.strapiArticle.title
  const content = data.strapiArticle.content

  return (
    <Layout pageTitle="Page">
      
      {/* Article Content */}
      <h1>{title}</h1>
      <ReactMarkdown children={content} />

      {/* Pagination */}
      <nav class="blog-pagination" aria-label="Pagination">
        {previous && (
          <Link to={`/${previous.slug}`} rel="previous">
              <h4>{previous.title}</h4>
          </Link>
        )}
        {next && (
          <Link to={`/${next.slug}`} rel="next">
            <h4>{next.title}</h4>
          </Link>
        )}
      </nav>
      
    </Layout>
  )
}
export default Article

// Graphql call
export const query = graphql`
  query Article($slug: String) {
    strapiArticle(slug: {eq: $slug}) {
      title
      created_at
      content
      slug
    }
  }
`