import * as React from 'react'
import { graphql } from 'gatsby'
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
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                {articles.map((article, index) => {
                  const title = article.node.title
                  const description = article.node.description
                  return (
                    <div class={`carousel-item ${index === 0 ? 'active' : null}`}>
                      <GatsbyImage
                        image={article.node.image.localFile.childImageSharp.gatsbyImageData}
                        className="d-block w-100"
                        alt={description}
                      />
                      <div class="carousel-caption d-none d-md-block">
                        <h5>{title}</h5>
                        <p>{description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
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
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
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