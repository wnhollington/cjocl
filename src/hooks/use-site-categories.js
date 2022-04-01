import { useStaticQuery, graphql } from "gatsby";

export const useSiteCategories = () => {
  const { allStrapiCategory } = useStaticQuery(
    graphql`
      query Categories {
        allStrapiCategory {
          edges {
            node {
              title
              slug
              articles {
                id
              }
            }
          }
        }
      }
    `
  )
  return allStrapiCategory.edges
}