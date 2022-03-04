import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown"
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'

// Render
const Article = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const title = data.strapiArticle.title
  const content = data.strapiArticle.content
  const date = data.strapiArticle.created_at
  const author = data.strapiArticle.author.name

  return (
    <Layout pageTitle={title}>

      <div className="row g-5">

        <div className="col-md-8">
          {/* Article */}
          <article>
            {/* Header */}
            <header className='mb-4'>
              <h1 className="fw-bolder mb-1">{title}</h1>
              <p className="text-muted fst-italic mb-2">Post on {date} by {author}</p>
              <Link to="/" className="badge bg-secondary text-decoration link-link">Tech</Link>
            </header>

            {/* Feature Image */}
            <figure className='mb-4'>
              <img src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="feature image" className="img-fluid rounded" />
            </figure>

            {/* Article Content */}
            <ReactMarkdown children={content} className="mb-5"/>
          </article>

          {/* Pagination */}
          <nav class="blog-pagination" aria-label="Pagination">
            {previous && (
              <Link to={`/${previous.slug}`} rel="previous">
                  <h4><span></span>{previous.title}</h4>
              </Link>
            )}
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                <h4>{next.title}<span></span></h4>
              </Link>
            )}
          </nav>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
      
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
      author {
        name
      }
    }
  }
`