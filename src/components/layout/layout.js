import * as React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

// Components
import Seo from "./seo"
import Header from "./header"
import Footer from "./footer"

// Styles
import "../../styles/layout.scss"

const Layout = ({ title, description, children }) => {
  const { siteName } = useSiteMetadata()

  return (
    
    <div className="container-fluid p-0">

      <Seo 
        title={title}
        description={description}
      />
      
      <Header siteTitle={siteName ? siteName : "Test"} />
      
      <main className="container py-2">{children}</main>

      <Footer />

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
