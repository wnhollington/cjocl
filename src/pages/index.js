import * as React from "react"

import Layout from "../components/layout"
import FeaturedPosts from "../components/featuredPosts"
import Bloglist from "../components/blogList"
import Sidebar from "../components/sidebar"

const IndexPage = () => (
  
  <Layout>

    <FeaturedPosts />

    <div className="row g-5">
      <Bloglist />
      <Sidebar />
    </div>
 
  </Layout>
)

export default IndexPage
