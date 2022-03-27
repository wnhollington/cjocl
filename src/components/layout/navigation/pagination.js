import * as React from "react"
import { Link } from "gatsby"

// Render
const Pagination = ({isFirst, isLast, prevPage, nextPage}) => {
  return (
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
}

export default Pagination