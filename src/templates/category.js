import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout'
import Sidebar from '../components/layout/sidebar'
import Pagination from '../components/layout/navigation/pagination'
import Breadcrumbs from '../components/layout/navigation/breadcrumbs'

// Render
const Category = ({ pageContext, data }) => {
  const { categoryTitle, categoryDescription, categorySlug, numPagesPerCategory, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPagesPerCategory
  const prevPage = currentPage - 1 === 1 ? `/${categorySlug}` : `/${categorySlug}/${(currentPage - 1).toString()}`
  const nextPage = isLast ? `/${categorySlug}/${numPagesPerCategory}` : `/${categorySlug}/${(currentPage + 1).toString()}`
  const articles = data.allStrapiArticle.edges
  
  const aboutSection = (
    <>
      <h4 className='fst-italic'>Articles about {categoryTitle}</h4>
      <p className="mb-0">{categoryDescription}</p>
    </>
  )

  return (
    <Layout title={categoryTitle} description={categoryDescription}>
      <Breadcrumbs page={categoryTitle} />
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
              <article class="bg-light shadow-sm p-2 m-2 rounded">
                <h2><Link to={`/${category.slug}/${slug}`}>{title}</Link></h2>
                <p class="text-muted">{date} | by <Link to={`/${author.slug}`}>{author.name}</Link></p>
                <p>{description}</p>
              </article>
            )
          })}

          {/* Pagination - Navigation*/}
          {numPagesPerCategory > 1 ? <Pagination isFirst={isFirst} isLast={isLast} prevPage={prevPage} nextPage={nextPage}/> : null}

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