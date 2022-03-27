import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown"
import footnotes from "remark-footnotes"
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Components
import Layout from '../components/layout/layout'
import Sidebar from '../components/layout/sidebar'
import SocialShare from '../components/article/socialShare'
import PaginationPost from '../components/layout/navigation/paginationPost'
import Breadcrumbs from '../components/layout/navigation/breadcrumbs'

// Render
const Article = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const title = data.strapiArticle.title
  const content = data.strapiArticle.content
  const img = data.strapiArticle.image.localFile.childImageSharp.gatsbyImageData
  const date = data.strapiArticle.createdAt
  const author = data.strapiArticle.author
  const category = data.strapiArticle.category
  const description = data.strapiArticle.description
  const slug = data.strapiArticle.slug

  const authorSection = (
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="mx-auto">
        <GatsbyImage
          image={author.picture.localFile.childImageSharp.gatsbyImageData}
          alt={title}
          className="rounded"
        />
      </div>
      <h4 className='fst-italic py-2 text-center'>{author.name}</h4>
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
    </div>
  )

  return (
    <Layout title={title} description={description}>
      <Breadcrumbs category={category} page={title} />

      {/* Header */}
      <header className='mb-4'>
        <h1 className="fw-bolder mb-1">{title}</h1>
        <p className="text-muted mb-2">{date}</p>
        <Link to={`/${category.slug}`} className="badge bg-primary">{category.name}</Link>
      </header>

      <div className="row g-5">

        <div className="col-md-8">
          {/* Article */}
          <article class="pb-3">
            {/* Feature Image */}
            <figure className='mb-4'>
              <GatsbyImage image={img} alt={title} className="img-fluid rounded" />
              <figcaption className="text-muted fst-italic pt-2">{description}</figcaption>
            </figure>

            {/* Article Content */}
            <ReactMarkdown
              remarkPlugins={[footnotes]}
              children={content}
              className="mb-5"
            />

            {/* Social Share */}
            <SocialShare url={`www.test.com/${category.slug}/${slug}`} title={title} description={description}/>
          </article>

          {/* Pagination */}
          <PaginationPost previous={previous} next={next} />
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
  query article($slug: String) {
    strapiArticle(slug: {eq: $slug}) {
      title
      createdAt(formatString: "MMMM DD, YYYY")
      description
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

