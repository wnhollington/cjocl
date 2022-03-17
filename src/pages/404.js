import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout/layout"

const NotFoundPage = () => (
  <Layout title="404: Page Not Found">
    <div className="container text-center my-5">
      <div className="row">
        <div className="col my-auto">
          <h1>404: Page Not Found</h1>
          <p>Oops!  It looks like the page you are looking for is lost in space.  Please click the link below to go Home.</p>
          <Link to="/" className="btn btn-primary">Home</Link>
        </div>
        <div className="col">
          <StaticImage 
            src="../images/404.png"
            width={500}
          />
        </div>
      </div>
    </div>

  </Layout>
)

export default NotFoundPage
