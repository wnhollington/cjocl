import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { GatsbyImage } from 'gatsby-plugin-image'

// Hooks
import { useSiteCategories } from "../../hooks/use-site-categories"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

// Components
import SignupModal from "../signup/signupModal"
import Nav from "./navigation/nav"

// Render
const Header = ({ siteTitle }) => {
  const categories = useSiteCategories();
  const siteMetaData = useSiteMetadata();
  const favicon = siteMetaData.favicon.localFile.childImageSharp.gatsbyImageData;

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
                image={favicon}
                alt={siteTitle} 
              />
            </Link>
          </div>
          
          {/* Right */}
          <div class="col-4 d-flex justify-content-end align-items-center">

            <ThemeToggler>
                {({ theme, toggleTheme }) => (
                  
                    <div className="toggle-theme px-3">
                        <FontAwesomeIcon 
                            icon={theme === "dark" ? faSun : faMoon }
                            onClick={
                              () => {
                                theme === "dark" ? toggleTheme("light") : toggleTheme("dark")
                                var audio = document.getElementById("audio");
                                audio.play();
                              }
                            }
                        />
                        <audio id="audio" src="https://res.cloudinary.com/wnhollington/video/upload/v1647652546/mouseClick.mp3"></audio>
                    </div>
                )}
            </ThemeToggler>
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



