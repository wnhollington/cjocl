import { useStaticQuery, graphql } from "gatsby";

export const useSiteCategories = () => {
  const { allStrapiPage } = useStaticQuery(
    graphql`
      query Pages {
        allStrapiPage(filter: {slug: {in: ["disclaimer", "privacy-policy"]}}) {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  )
  return allStrapiPage.edges
}