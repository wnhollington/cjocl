import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { GatsbyImage } from 'gatsby-plugin-image'

// Hooks
import { useSiteCategories } from "../../../hooks/use-site-categories"
import { useSiteMetadata } from "../../../hooks/use-site-metadata"

// Components
import SignupModal from "../../signup/signupModal"
import Nav from "../../layout/navigation/nav"
import DarkmodeToggle from "./darkmodeToggle"

// Render
const Header = ({ siteTitle }) => {
  const categories = useSiteCategories();
  const siteMetaData = useSiteMetadata();
  const logoLight = siteMetaData.favicon[0].localFile.childImageSharp.gatsbyImageData;
  const logoDark = siteMetaData.favicon[1].localFile.childImageSharp.gatsbyImageData;
  const theme = document.querySelector('body');
  let logo = theme.classList.contains('dark') ? logoLight : logoDark;

  return (
    <div class="container">

      <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          
          {/* Lefter */}
          <div class="col-4 pt-1">
            <Link to="#" className="badge bg-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Subcribe</Link>
          </div>

          <SignupModal />
          
          {/* Center */}
          <div class="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark" href="#">
              <GatsbyImage 
                image={logo}
                alt={siteTitle} 
              />
            </Link>
          </div>
          
          {/* Right */}
          <div class="col-4 d-flex justify-content-end align-items-center">
            <DarkmodeToggle />
            <Link to="/rss.xml" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faRss} size="1x" /></Link>
          </div>

        </div>
      </header>

      {/* Navbar - Categories */}
      <div className="nav-scroller py-1 mb-2 d-none">
        <Nav edges={categories}/>
      </div>

    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header



