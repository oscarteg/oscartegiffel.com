import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Card from '../components/Card'

const IndexPage = ({ data }) => {
  // const siteTitle = data.site.siteMetadata.title
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" keywords={[`homepage`, `oscar te giffel`, `gatsby`]} />
      <div className="container flex flex-wrap mx-auto justify-center">
        {projects.map(project => (
          <div
            className="md:w-1/2 p-5 max-w-sm sm:mx-2 md:mx-0"
            key={project.node.frontmatter.title}
          >
            <Card
              title={project.node.frontmatter.title}
              date={project.node.frontmatter.date}
              image={project.node.frontmatter.image.childImageSharp.fluid}
              tags={project.node.frontmatter.tags}
              description={project.node.frontmatter.description}
            />
          </div>
        ))}
      </div>
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
