import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'

// Hooks
import { useSiteCategories } from "../../hooks/use-site-categories"

// Components
import SignupModal from "../signup/signupModal"

// Constants
const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "p-2 link-secondary active" } : {className: "p-2 link-secondary"}
}

const ExactNavLink = props => (
  <Link getProps={isActive} {...props} />
)

// Render
const Header = ({ siteTitle }) => {
  const categories = useSiteCategories();

  return (
    <div class="container">

      <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          
          <div class="col-4 pt-1">
            <Link to="#" className="badge bg-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Subcribe</Link>
          </div>

          <SignupModal />
          
          <div class="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark" href="#">{siteTitle}</Link>
          </div>
          
          <div class="col-4 d-flex justify-content-end align-items-center">
            <Link to="/rss.xml" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faRss} size="1x" /></Link>
          </div>

        </div>
      </header>

      <div class="nav-scroller py-1 mb-2 d-none">
        <nav class="nav d-flex justify-content-between">
          {categories.map(({ node }) => {
            return <ExactNavLink to={`/${node.slug}`}>{node.name}</ExactNavLink>
          })}
        </nav>
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



