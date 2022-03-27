import * as React from "react"
import { Link } from "gatsby"

// Render
const Breadcrumbs= ({category, page}) => {
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        {category ? <li class="breadcrumb-item"><Link to={`/${category.slug}`}>{category.name}</Link></li> : null}
        <li class="breadcrumb-item active" aria-current="page">{page}</li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs