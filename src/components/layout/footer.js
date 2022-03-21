import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'

// Hooks
import { useSitePages } from "../../hooks/use-site-pages"

// Components
import Nav from "./navigation/nav"

const Footer = () => {
  const pages = useSitePages();
  return (
    <footer class="blog-footer">
      <div className="nav-scroller py-1 mb-2">
        <Nav edges={pages}/>
      </div>
      <Link to="#" class="to-top btn btn-primary">
        <FontAwesomeIcon 
          icon={faUpLong} size="1x"
          onClick={window.scroll({top: 0, left: 0, behavior: 'smooth'})}
        />
      </Link>
    </footer>
  )
}

export default Footer



