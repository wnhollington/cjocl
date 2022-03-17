import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

// Constants
const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "p-2 link-secondary active" } : {className: "p-2 link-secondary"}
}

const ExactNavLink = props => (
  <Link getProps={isActive} {...props} />
)

// Render
const NavFooter = props => {
  const data = useStaticQuery(graphql`
    query Pages {
      allStrapiPage(filter: {slug: {in: ["disclaimer", "privacy-policy"]}}) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)
  const pages = data.allStrapiPage.edges

  return (
    <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-center">
        {pages.map(({ node }) => {
          return <ExactNavLink to={`/${node.slug}`}>{node.title}</ExactNavLink>
        })}
      </nav>
    </div>

  )
}

export default NavFooter