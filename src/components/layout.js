import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// Components
import Header from "./header"
import FeaturedPosts from "./featuredPosts"
import Sidebar from "./sidebar"
import Footer from "./footer"

// Styles
import "../styles/layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    
    <div className="container-fluid p-0">
      
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      
      <main className="container">
        
        <FeaturedPosts />
        <div className="row g-5">
          <div className="col-md-8">{children}</div>
          <Sidebar />
        </div>

      </main>

      <Footer />

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
