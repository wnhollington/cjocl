import * as React from "react"

import Layout from "../components/layout/layout"
import Search from "../components/search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

const SearchPage = () => (
  <Layout title="Search">
    <Search indices={searchIndices} />
  </Layout>
)

export default SearchPage
