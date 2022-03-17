import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

// Components
import Layout from "../components/layout/layout"

const Page = props => {
  // Constants
  const page = props.data.strapiPage
  const title = page.title
  const updated = page.updatedAt 
  const content = page.content

  return (
    <Layout title={title}>
      {/* Header */}
      <div className='mb-4'>
        <h1 className="fw-bolder mb-1">{title}</h1>
        <p className="text-muted fst-italic mb-2">Last updated: {updated}</p>
      </div>

      <ReactMarkdown 
        children={content}
      />

    </Layout>
  )

}
export default Page

// Graphql Call
export const query = graphql`
  query Page($id: String) {
    strapiPage(id: { eq: $id }) {
      slug
      updatedAt(formatString: "DD MMMM, YYYY")
      title
      content
    }
  }
`