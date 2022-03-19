import * as React from "react"
import { Link } from "gatsby"

// Hooks
import { useSitePages } from "../../../hooks/use-site-pages"

// Constants
const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "p-2 link-secondary active" } : {className: "p-2 link-secondary"}
}

const ExactNavLink = props => (
  <Link getProps={isActive} {...props} />
)

// Render
const NavFooter = () => {
  const pages = useSitePages();
  return (
    <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-center">
        {pages.map(({ node }) => {
          return <ExactNavLink to={`/${node.slug}`} key={node.title}>{node.title}</ExactNavLink>
        })}
      </nav>
    </div>

  )
}

export default NavFooter