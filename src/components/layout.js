import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/use-site-metadata"

// Components
import Header from "./header"
import Footer from "./footer"

// Styles
import "../styles/layout.scss"

const Layout = ({ children }) => {
  const { siteName } = useSiteMetadata()

  return (
    
    <div className="container-fluid p-0">
      
      <Header siteTitle={siteName ? siteName : 'Title'} />
      
      <main className="container">{children}</main>

      <Footer />

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
