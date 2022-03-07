import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Components
import Layout from '../components/layout'

// Render
const Writer = ({ data, pageContext }) => {
  const {name, email, linkedin, description } = pageContext
  const articles = data.allStrapiArticle.edges

  return (
    <Layout pageTitle={name}>
      <div className="row g-5">
        {/* Sidebar */}
        <div className="col-md-4">
          <div className="position-sticky" style={{top: '2rem'}}>
            <div class="p-4 mb-3 bg-light rounded">
              <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="mx-auto">
                  <GatsbyImage
                    image={articles[0].node.author.picture.localFile.childImageSharp.gatsbyImageData}
                    alt={name}
                    className="rounded"
                  />
                </div>
                <h4 className='fst-italic'>{name}</h4>
                <div className='social-icons'>
                    <a href={`mailto:${email}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mx-1">
                        <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                    </a>
                    <a href={linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mx-1">
                        <FontAwesomeIcon icon={faLinkedin} size="2x"/>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="col-md-8">
          <p>
            {description}
          </p>
          <div>
            <h2>Recent Articles by {name}</h2>
            {articles.map(article => {
              const title = article.node.title
              const slug = article.node.slug
              const description = article.node.description
              const date = article.node.created_at
              const author = article.node.author
              return (
                <article class="blog-post">
                  <h4 class="blog-post-title">{title}</h4>
                  <p class="blog-post-meta">{date} by <Link to={`/${author.slug}`}>{author.name}</Link></p>
                  <p>{description}</p>
                  <Link to={`/${slug}`}>Continue Reading</Link>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )

}
export default Writer

// Graphql 
export const query = graphql`
  query Writer($slug: String) {
    allStrapiArticle(
      filter: {author: {slug: {eq: $slug}}}
      sort: {fields: created_at, order: DESC}
      ) {
      edges {
        node {
          title
          slug
          description
          created_at(formatString: "DD MM, YYYY")
          author {
            picture {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 250)
                }
              }
            }
          }
        }
      }
    }
  }
`