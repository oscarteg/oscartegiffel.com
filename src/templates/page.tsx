import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/Layout'
import SEO from '../components/Seo'

interface PageProps {
  data: any
  location: any
}

const Page: React.FunctionComponent<PageProps> = ({ data, location }) => {
  const { html, frontmatter, tableOfContents, fields } = data.markdownRemark
  const { title, description } = frontmatter
  const { modifiedTime } = fields
  return (
    <Layout location={location}>
      <SEO
        title={title}
        keywords={[`homepage`, title, `oscar te giffel`, `gatsby`]}
        description={description || ''}
      />
      <h1 className="title text-center">{title}</h1>
      {/* <div className={`text-center text-xs text-grey-light`}>{modifiedTime}</div> */}

      <div className="max-w-xl mx-auto">
        <div className="my-6 border-b border-yellow-dark" />
        {/* <div
          className="table-of-contents"
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        /> */}

        <div className={'content'} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query PagesBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        modifiedTime(fromNow: true)
      }
      html
      tableOfContents
      frontmatter {
        title
        description
      }
    }
  }
`
