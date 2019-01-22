import React from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Card from '../components/Card'

const IndexPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`homepage`, `oscar te giffel`, `gatsby`]} />
      {projects.map(project => {
        const { title, image, tags, description } = project.node.frontmatter
        const { slug } = project.node.fields
        return (
          // <Link to={slug}>
          <div
            className="md:w-1/2 m-5 max-w-sm w-full cursor-pointer"
            key={title}
            onClick={() => navigate(slug)}
          >
            <Card
              title={title}
              image={image.childImageSharp.fluid}
              tags={tags}
              description={description}
            />
          </div>
          // </Link>
        )
      })}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
