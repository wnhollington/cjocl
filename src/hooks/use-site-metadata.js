import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { allStrapiGlobal } = useStaticQuery(
    graphql`
      query SiteMetaData {
        allStrapiGlobal {
          nodes {
            siteName
            favicon {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    `
  )
  return allStrapiGlobal.nodes[0]
}