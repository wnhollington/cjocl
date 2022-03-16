import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout/layout'
import Sidebar from '../components/layout/sidebar'

// Render
const Category = ({ pageContext, data }) => {
  const { categoryName, categoryDescription, categorySlug, numPagesPerCategory, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPagesPerCategory
  const prevPage = currentPage - 1 === 1 ? `/${categorySlug}` : `/${categorySlug}/${(currentPage - 1).toString()}`
  const nextPage = isLast ? `/${categorySlug}/${numPagesPerCategory}` : `/${categorySlug}/${(currentPage + 1).toString()}`
  const articles = data.allStrapiArticle.edges
  
  const aboutSection = (
    <>
      <h4 className='fst-italic'>Articles about {categoryName}</h4>
      <p className="mb-0">{categoryDescription}</p>
    </>
  )

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
    <Layout title={categoryName} description={categoryDescription}> 
      <div className="row g-5">
        <div className="col-md-8">
          {articles.map(article => {
            const title = article.node.title
            const slug = article.node.slug
            const description = article.node.description
            const date = article.node.createdAt
            const author = article.node.author
            const category = article.node.category
            return (
              <article class="blog-post border-bottom shadow-sm p-2">
                <h2 class="blog-post-title"><Link to={`/${category.slug}/${slug}`}>{title}</Link></h2>
                <p class="blog-post-meta">{date} by <Link to={`/${author.slug}`}>{author.name}</Link></p>
                <p>{description}</p>
              </article>
            )
          })}

          {/* Pagination - Navigation*/}
          {numPagesPerCategory > 1 ? nav : null}

        </div>

        <Sidebar aboutSection={aboutSection}/>
        
      </div>
    </Layout>
  )
}
export default Category

// Graphql call
export const query = graphql`
  query category($categorySlug: String!, $skip: Int!, $limit: Int!) {
    allStrapiArticle(
      filter: {category: {slug: {eq: $categorySlug}}}
      limit: $limit
      skip: $skip
    ){
      edges {
        node {
          title
          author {
            name
            slug
          }
          createdAt(formatString: "MMMM DD, YYYY")
          slug
          description
          category {
            slug
          }
        }
      }
    }
  }
`