import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

// Components
import Layout from "../components/layout/layout"
import FeaturedPosts from "../components/featuredPosts"
import Sidebar from "../components/layout/sidebar"
import Pagination from '../components/layout/navigation/pagination'

// Render
const Index = ({ data, pageContext }) => {
  const posts = data.allStrapiArticle.edges

  const { numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/${(currentPage - 1).toString()}`
  const nextPage = isLast ? `/${numPages}` : `/${(currentPage + 1).toString()}`

  const aboutSection = (
    <>
      <h4 class="fst-italic">About</h4>
      <p class="mb-0">{data.strapiGlobal.defaultSeo.metaDescription}</p>
    </>
  )

  return (
    <Layout title="Home" description="Home Page">

      <FeaturedPosts />

      <div className="row g-5">
        
        {/* Bloglist */}
        <div className="col-md-8">
          <h3 class="pb-4 mb-4 fst-italic border-bottom">Latest Articles</h3>

          {posts.map(({ node }) => {
            const title = node.title
            const description = node.description
            const date = node.createdAt
            const slug = node.slug
            const author = node.author
            const categorySlug = node.category.slug

            return (
              <article class="blog-post border-bottom shadow-sm p-2" key={title}>
                <h2 class="blog-post-title"><Link to={`/${categorySlug}/${slug}`}>{title}</Link></h2>
                <p class="blog-post-meta">{date} | by <Link to={`/${author.slug}`}>{author.name}</Link></p>
                <p>{description}</p>
              </article>
            )

          })}

          {/* Pagination - Navigation */}
          {numPages > 1 ? <Pagination isFirst={isFirst} isLast={isLast} prevPage={prevPage} nextPage={nextPage}/> : null}

        </div>

        <Sidebar aboutSection = {aboutSection} />

      </div>
  
    </Layout>
  )
}
export default Index

// Graphql call
export const query = graphql`
  query index($skip: Int!, $limit: Int!) {
    strapiGlobal {
      defaultSeo {
        metaDescription
      }
    }
    allStrapiArticle(
      sort: {fields: createdAt, order: DESC}
      filter: {featured: {ne: true}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          description
          title
          createdAt(formatString: "MMMM DD, YYYY")
          category {
            name
            slug
          }
          slug
          author {
            name
            slug
          }
        }
      }
    }
  }
`


