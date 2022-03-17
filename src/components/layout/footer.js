import * as React from "react"
import { Link } from "gatsby"

// Components
import NavFooter from "./navigation/navFooter"

const Footer = () => {
  return (
    <footer class="blog-footer bg-light">
      <NavFooter />
      <Link to="#">Back to top</Link>
    </footer>
  )
}

export default Footer



