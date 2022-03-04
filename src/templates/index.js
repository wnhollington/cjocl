import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

// Components
import Layout from "../components/layout"
import FeaturedPosts from "../components/featuredPosts"
import Sidebar from "../components/sidebar"

// Render
const Index = ({ data, pageContext }) => {
  const posts = data.allStrapiArticle.edges

  const { numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/${(currentPage - 1).toString()}`
  const nextPage = isLast ? `/${numPages}` : `/${(currentPage + 1).toString()}`

  return (
    <Layout>

      <FeaturedPosts />

      <div className="row g-5">
        
        {/* Bloglist */}
        <div className="col-md-8">
          <h3 class="pb-4 mb-4 fst-italic border-bottom">Latest Articles</h3>

          {posts.map(({ node }) => {
            const title = node.title
            const description = node.description
            const date = node.created_at
            const slug = node.slug
            const author =node.author.name
            return (
              <article class="blog-post">
                <h2 class="blog-post-title">{title}</h2>
                <p class="blog-post-meta">{date} <a href="#">{author}</a></p>
                <p>{description}</p>
                <Link to={`/${slug}`}>Continue Reading</Link>
              </article>
            )

          })}

          {/* Pagination - Navigation */}
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

        </div>

        <Sidebar />

      </div>
  
    </Layout>
  )
}
export default Index

// Graphql call
export const query = graphql`
  query blogList($skip: Int!, $limit: Int!) {
    allStrapiArticle(
      sort: {fields: created_at, order: DESC}
      filter: {featured: {ne: true}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          description
          title
          created_at(formatString: "DD MMMM, YYYY")
          category {
            name
          }
          slug
          author {
            name
          }
        }
      }
    }
  }
`