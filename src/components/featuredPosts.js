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
            createdAt(formatString: "DD MMMM, YYYY")
            category {
              name
              slug
            }
            slug
            image {
              url
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
      <div class="p-4 p-md-5 mb-2 text-white border rounded shadow-sm bg-dark" style={{background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${featuredPost.node.image.url}") no-repeat center center fixed`}}>
        <div class="col-md-6 px-0">
          <h1 class="display-4 fst-italic">{featuredPost.node.title}</h1>
          <p class="lead my-3">{featuredPost.node.description}</p>
          <p class="lead mb-0">
            <Link to={`/${featuredPost.node.category.slug}/${featuredPost.node.slug}`} className="text-white fw-bold">Continue reading...</Link>
          </p>
        </div>
      </div>

      {/* Minor Featured Posts */}
      <div class="row mb-2 ">
        {minorPosts.map(({ node })=> {
          const title = node.title
          const description = node.description
          const date = node.created_at
          const category = node.category
          const slug = node.slug
          const img = node.image.localFile.childImageSharp.gatsbyImageData
          
          return (
            <div class="col-lg-6 mb-4" key={title}>
              <div class="cards row g-0 border rounded shadow-sm h-md-250 h-100 d-flex">
                <div class="col-auto">
                  <GatsbyImage
                    image={img}
                    alt={title}
                    class="h-100 rounded-left"
                  />
                </div>
                <div class="col p-sm-2">
                  <strong class="mb-2 badge bg-primary">{category.name}</strong>
                  <h3 class="mb-0">{title}</h3>
                  <div class="mb-1 text-muted">{date}</div>
                  <p class="card-text mb-auto">{description}</p>
                  <Link to={`/${category.slug}/${slug}`}>Continue reading</Link>
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