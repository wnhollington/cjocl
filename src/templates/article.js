import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown"
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

// Components
import Layout from '../components/layout'

// Render
const Article = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const title = data.strapiArticle.title
  const content = data.strapiArticle.content
  const img = data.strapiArticle.image.localFile.childImageSharp.gatsbyImageData
  const date = data.strapiArticle.created_at
  const author = data.strapiArticle.author
  const category = data.strapiArticle.category

  return (
    <Layout pageTitle={title}>

      {/* Header */}
      <header className='mb-4'>
        <h1 className="fw-bolder mb-1">{title}</h1>
        <p className="text-muted fst-italic mb-2">Post on {date} by {author.name}</p>
        <Link to={`/${category.slug}`} className="badge bg-secondary text-decoration link-link">{category.name}</Link>
      </header>

      <div className="row g-5">

        <div className="col-md-8">
          {/* Article */}
          <article>
            {/* Feature Image */}
            <figure className='mb-4'>
              <GatsbyImage image={img} alt={title} className="img-fluid rounded" />
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
        <aside className='col-md-4 mt-15'>
          <div className="p-4 mb-3 bg-light rounded text-center">
            <GatsbyImage
              image={author.picture.localFile.childImageSharp.gatsbyImageData}
              alt={title}
              className="rounded"
            />
            <h4 className='fst-italic'>{author.name}</h4>
            <p>{author.email}</p>
            <p className="mb-0">General description of author</p>
          </div>
        </aside>
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
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      slug
      author {
        name
        email
        picture {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 250)
            }
          }
        }
      }
      category {
        name
        slug
      }
    }
  }
`