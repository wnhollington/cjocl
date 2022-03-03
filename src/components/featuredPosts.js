import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const FeaturedPosts = () => {

  // Query Featured Posts
  const data = useStaticQuery(graphql`
    query FeaturedPosts {
      allStrapiArticle(filter: {featured: {eq: true}}) {
        edges {
          node {
            description
            title
            created_at(formatString: "DD MMMM, YYYY")
            category {
              name
            }
            slug
            image {
              id
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 250)
                }
              }
            }
          }
        }
      }
    }
  `)

  // Constants
  const featuredPost = data.allStrapiArticle.edges[0]
  const minorPosts = data.allStrapiArticle.edges.slice(1)

  // Return Featured Posts
  return (
    <>
      {/* Main Featured Post */}
      <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div class="col-md-6 px-0">
          <h1 class="display-4 fst-italic">{featuredPost.node.title}</h1>
          <p class="lead my-3">{featuredPost.node.description}</p>
          <p class="lead mb-0">
            <Link to={`/${featuredPost.node.slug}`} className="text-white fw-bold">Continue reading...</Link>
          </p>
        </div>
      </div>

      {/* Minor Featured Posts */}
      <div class="row mb-2">
        {minorPosts.map(({ node })=> {
          const title = node.title
          const description = node.description
          const date = node.created_at
          const category = node.category.name
          const slug = node.slug
          const img = node.image.localFile.childImageSharp.gatsbyImageData
          return (
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary">{category}</strong>
                  <h3 class="mb-0">{title}</h3>
                  <div class="mb-1 text-muted">{date}</div>
                  <p class="card-text mb-auto">{description}</p>
                  <Link to={`/${slug}`}>Continue reading</Link>
                </div>
                <div class="col-auto d-none d-lg-block">
                  <GatsbyImage
                    image={img}
                    alt={title}
                    className="bd-placeholder-img"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </>
  )
}

export default FeaturedPosts