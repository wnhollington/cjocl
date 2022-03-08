import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown"
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Components
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'

// Render
const Article = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const title = data.strapiArticle.title
  const content = data.strapiArticle.content
  const img = data.strapiArticle.image.localFile.childImageSharp.gatsbyImageData
  const date = data.strapiArticle.created_at
  const author = data.strapiArticle.author
  const category = data.strapiArticle.category

  const authorSection = (
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="mx-auto">
        <GatsbyImage
          image={author.picture.localFile.childImageSharp.gatsbyImageData}
          alt={title}
          className="rounded"
        />
      </div>
      <h4 className='fst-italic'>{author.name}</h4>
      <div className='social-icons'>
          <Link to={`/${author.slug}`}  className="btn btn-sm btn-outline-primary mx-1">
              <FontAwesomeIcon icon={faLink} size="2x"/>
          </Link>
          <a href={`mailto:${author.email}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mx-1">
              <FontAwesomeIcon icon={faEnvelope} size="2x"/>
          </a>
          <a href={author.linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mx-1">
              <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </a>
      </div>
      <p className="mt-4 mb-0">{author.description}</p>
    </div>
  )

  return (
    <Layout pageTitle={title}>

      {/* Header */}
      <header className='mb-4'>
        <h1 className="fw-bolder mb-1">{title}</h1>
        <p className="text-muted fst-italic mb-2">Post on {date} by {author.name}</p>
        <Link to={`/${category.slug}`} className="badge bg-primary">{category.name}</Link>
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
          <nav class="blog-article-pagination d-flex justify-content-around" aria-label="Pagination">
            <div className="previous-page">
              {previous && (
                <>
                  <h4>Previous Article</h4>
                  <Link to={`/${previous.slug}`} rel="previous">{previous.title}</Link>
                </>
              )}
            </div>
            <div className="next-page">
              {next && (
                <>
                  <h4>Next Article</h4>
                  <Link to={`/${next.slug}`} rel="next">{next.title}</Link>
                </>

              )}
            </div>
          </nav>
        </div>

        {/* Sidebar */}
        <Sidebar aboutSection={authorSection} />
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
      created_at(formatString: "DD MMMM, YYYY")
      content
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      slug
      author {
        name
        email
        linkedin
        slug
        description
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

