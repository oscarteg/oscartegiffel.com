import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import PageTransition from 'gatsby-plugin-page-transitions'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Bio from '../components/Bio'
import '../assets/layout.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

interface LayoutProps {
  children?: any
  location: any
  className?: string
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  location,
  className,
}) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
        const { title } = data.site.siteMetadata

        return (
          <PageTransition>
            <Header siteTitle={title} location={location} />
            <div className={`container ${className}`}>{children}</div>
            <div className={`container max-w-md`}>
              <Bio />
            </div>
            <Footer />
          </PageTransition>
        )
      }}
    />
  )
}

export default Layout
