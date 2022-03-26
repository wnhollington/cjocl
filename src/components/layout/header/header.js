import React, { useState } from "react"
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
  const [state, setState] = useState({
    dark: false
  })

  if (typeof window !== "undefined") {
    window.localStorage.theme === 'dark' ? state.dark = true : state.dark = false
  }

  const categories = useSiteCategories();
  const siteMetaData = useSiteMetadata();
  const logoLight = siteMetaData.favicon[0].localFile.childImageSharp.gatsbyImageData;
  const logoDark = siteMetaData.favicon[1].localFile.childImageSharp.gatsbyImageData;

  return (
    <div class="container">

      <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          
          {/* Left */}
          <div class="col-4 pt-1">
            <Link to="#" className="badge bg-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Subcribe</Link>
          </div>
          <SignupModal />
          
          {/* Center */}
          <div class="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark" href="#">
              <GatsbyImage 
                image={state.dark === true ? logoLight : logoDark}
                alt={siteTitle} 
              />
            </Link>
          </div>
          
          {/* Right */}
          <div class="col-4 d-flex justify-content-end align-items-center">
            <Link class="link-secondary" to="/search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
            </Link>
            <DarkmodeToggle state={state} setState={setState}/>
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



