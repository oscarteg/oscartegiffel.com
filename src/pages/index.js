import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Card from '../components/Card'

const IndexPage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout> 
      <SEO title="Home" keywords={[`homepage`, `oscar te giffel`, `gatsby`]} />
        {projects.map(project => {
          const { title, image, tags, description } = project.node.frontmatter
          return (
            <div
              className="md:w-1/2 p-5 max-w-sm sm:mx-2 md:mx-0 w-full"
              key={title}
            >
              <Card
                title={title}
                image={image.childImageSharp.fluid}
                tags={tags}
                description={description}
              />
            </div>
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
