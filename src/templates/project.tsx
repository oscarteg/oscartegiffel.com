import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/Layout'
import SEO from '../components/Seo'
import Img from 'gatsby-image'

interface ProjectPageProps {
  data: any
  location: any
}

const ProjectPage: React.FunctionComponent<ProjectPageProps> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark
  const { html, frontmatter } = post
  const { title, url, image } = frontmatter
  return (
    <Layout location={location}>
      <SEO title={title} keywords={[title, `oscar te giffel`, `gatsby`]} />
      <h1 className="title text-center">{title}</h1>

      <div className="max-w-lg mx-auto">
        <div className="flex justify-center my-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-grey font-mono bg-transparent"
            href={url}
          >
            {url}
          </a>
        </div>
        <Img fluid={image.childImageSharp.fluid} />
        <div className="my-6 border-b border-yellow-600" />
        <div className={'content'} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default ProjectPage

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        url
        date(formatString: "MMMM DD, YYYY", locale: "nl")
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
