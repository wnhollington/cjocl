import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

const Bloglist = () => {

  // Query Featured Posts
  const data = useStaticQuery(graphql`
    query blogList {
      allStrapiArticle {
        edges {
          node {
            description
            title
            created_at(formatString: "DD MMMM, YYYY")
            category {
              name
            }
          }
        }
      }
    }
  `)

  // Constants
  const posts = data.allStrapiArticle.edges

  // Return Posts
  return (
    <>
        <div className="col-md-8">
          <h3 class="pb-4 mb-4 fst-italic border-bottom">
            Latest Articles
          </h3>

          {posts.map(({ node }) => {
            const title = node.title
            const description = node.description
            const date = node.created_at
            return (
              <article class="blog-post">
                <h2 class="blog-post-title">{title}</h2>
                <p class="blog-post-meta">{date} <a href="#">Mark</a></p>
                <p>{description}</p>
                <Link to="#">Continue Reading</Link>
              </article>
            )

          })}

          <nav class="blog-pagination" aria-label="Pagination">
            <a class="btn btn-outline-primary" href="#">Older</a>
            <a class="btn btn-outline-secondary disabled">Newer</a>
          </nav>

        </div>
    </>
  )
}

export default Bloglist
