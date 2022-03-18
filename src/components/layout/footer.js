import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'

// Components
import NavFooter from "./navigation/navFooter"

const Footer = () => {
  return (
    <footer class="blog-footer bg-light">
      <NavFooter />
      <Link to="#" class="to-top btn btn-primary"><FontAwesomeIcon icon={faUpLong} size="1x" /></Link>
    </footer>
  )
}

export default Footer



