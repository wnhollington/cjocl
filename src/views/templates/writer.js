import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Components
import Layout from '../../components/layout/layout'

// Render
const Writer = ({ data, pageContext }) => {
  const {name, email, linkedin, description, slug, currentPage, numPagesPerWriter } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPagesPerWriter
  const prevPage = currentPage - 1 === 1 ? `/${slug}` : `/${slug}/${(currentPage - 1).toString()}`
  const nextPage = isLast ? `/${slug}/${numPagesPerWriter}` : `/${slug}/${(currentPage + 1).toString()}`
  const articles = data.allStrapiArticle.edges

  const nav = (
    <nav class="blog-pagination">
      <Link
        to={prevPage}
        rel="prev"
        className={!isFirst ? 'btn btn-outline-primary' : 'btn btn-outline-primary disabled'}
      >
        Older
      </Link>

      <Link
        to={nextPage}
        rel="next"
        className={!isLast ? 'btn btn-outline-primary' : 'btn btn-outline-primary disabled'}
      >
        Newer
      </Link>
    </nav>
  )

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
          <h1 class="d-none">{name}</h1>
          <p>
            {description}
          </p>
          <div class="mt-4">
            <h2>Recent Articles</h2>
              {articles.map(article => {
                const title = article.node.title
                const slug = article.node.slug
                const date = article.node.createdAt
                const category = article.node.category
                return (
                  <article class="blog-post p-1 m-0">
                    <h4 class="blog-post-title"><Link to={`/${category.slug}/${slug}`}>{title}</Link></h4>
                    <p className="blog-post-meta">{date}</p>
                  </article>
                )
              })}
            {/* Pagination - Navigation*/}
            {numPagesPerWriter > 1 ? nav : null}
          </div>
        </div>
      </div>
    </Layout>
  )

}
export default Writer

// Graphql 
export const query = graphql`
  query Writer($slug: String, $skip: Int!, $limit: Int!) {
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
          createdAt(formatString: "DD MMMM, YYYY")
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
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