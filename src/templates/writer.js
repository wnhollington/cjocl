import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Components
import Layout from '../components/layout'
import Pagination from '../components/layout/navigation/pagination'

// Render
const Writer = ({ data, pageContext }) => {
  const {name, email, linkedin, description, slug, currentPage, numPagesPerWriter } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPagesPerWriter
  const prevPage = currentPage - 1 === 1 ? `/${slug}` : `/${slug}/${(currentPage - 1).toString()}`
  const nextPage = isLast ? `/${slug}/${numPagesPerWriter}` : `/${slug}/${(currentPage + 1).toString()}`
  const articles = data.allStrapiArticle.edges

  return (
    <Layout title={name} description={description}>
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
                    className="rounded mb-2"
                  />
                </div>
                <h4 className='fst-italic text-center'>{name}</h4>
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
        <div className="col-md-8 pt-3">
          <h1 class="d-none">{name}</h1>
          <ReactMarkdown 
            children={description}
          />
          <div class="mt-4">
            <h2 className="text-center">Recent Articles</h2>
            <div className="grid-cards">
              {articles.map(article => {
                const title = article.node.title
                const slug = article.node.slug
                const date = article.node.createdAt
                const category = article.node.category
                const image = article.node.image.localFile.childImageSharp.gatsbyImageData
                const description = article.node.description
                return (
                  <div class="card">
                    <GatsbyImage image={image} className="card-img-top" />
                    <div class="card-body">
                      <h5 class="card-title">{title}</h5>
                      <p className="blog-post-meta text-muted">{date}</p>
                      <p class="card-text">{description}</p>
                      <Link to={`/${category.slug}/${slug}`} class="btn btn-primary">Read More</Link>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Pagination - Navigation*/}
            {numPagesPerWriter > 1 ? <Pagination isFirst={isFirst} isLast={isLast} prevPage={prevPage} nextPage={nextPage}/> : null}
          </div>
        </div>
      </div>
    </Layout>
  )

}
export default Writer

// Graphql 
export const query = graphql`
  query writer($slug: String, $skip: Int!, $limit: Int!) {
    allStrapiArticle(
      filter: {author: {slug: {eq: $slug}}}
      sort: {fields: createdAt, order: DESC}
      limit: $limit
      skip: $skip
      ) {
      edges {
        node {
          title
          slug
          description
          createdAt(formatString: "MMMM DD, YYYY")
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 250)
              }
            }
          }
          category {
            name
            slug
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