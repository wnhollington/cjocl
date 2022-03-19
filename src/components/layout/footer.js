import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'

// Hooks
import { useSitePages } from "../../hooks/use-site-pages"

// Components
import NavFooter from "./navigation/navFooter"

const Footer = () => {
  const pages = useSitePages();
  return (
    <footer class="blog-footer">
      <NavFooter edges={pages} />
      <Link to="#" class="to-top btn btn-primary"><FontAwesomeIcon icon={faUpLong} size="1x" /></Link>
    </footer>
  )
}

export default Footer



