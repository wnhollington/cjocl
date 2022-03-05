import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'

// Hooks
import { useSiteCategories } from "../hooks/use-site-categories"

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
            <Link to="#" className="link-secondary">Subcribe</Link>
          </div>
          
          <div class="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark" href="#">{siteTitle}</Link>
          </div>
          
          <div class="col-4 d-flex justify-content-end align-items-center">
            <Link to="#" className="link-secondary" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
            </Link>

            <Link to="#" className="btn btn-sm btn-outline-secondary"><FontAwesomeIcon icon={faRss} size="1x" /></Link>
          </div>

        </div>
      </header>

      <div class="nav-scroller py-1 mb-2">
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



