import * as React from "react"
import { Link } from "gatsby"

// Constants
const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "p-2 link-secondary active" } : {className: "p-2 link-secondary"}
}

const ExactNavLink = props => (
  <Link getProps={isActive} {...props} />
)

// Render
const NavFooter = ({edges}) => {
  return (
    <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-center">
        {edges.map(({ node }) => {
          return <ExactNavLink to={`/${node.slug}`} key={node.title}>{node.title}</ExactNavLink>
        })}
      </nav>
    </div>

  )
}

export default NavFooter