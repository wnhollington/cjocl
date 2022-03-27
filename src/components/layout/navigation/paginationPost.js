import * as React from "react"
import { Link } from "gatsby"

// Render
const PaginationPost = ({previous, next}) => {
  return (
    <nav class="blog-article-pagination d-flex justify-content-around" aria-label="Pagination">
      <div className="previous-page">
        {previous && (
          <>
            <h4>Previous Article</h4>
            <Link to={`/${previous.category.slug}/${previous.slug}`} rel="previous">{previous.title}</Link>
          </>
        )}
      </div>
      <div className="next-page">
        {next && (
          <>
            <h4>Next Article</h4>
            <Link to={`/${next.category.slug}/${next.slug}`} rel="next">{next.title}</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default PaginationPost