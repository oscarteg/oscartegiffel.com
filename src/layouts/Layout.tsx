import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Bio from '../components/Bio'
import Transition from '../components/Transition'
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
  className = '',
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
          <>
            <Header siteTitle={title} location={location} />
            <Transition location={location}>
              <div className={`container ${className}`}>{children}</div>
            </Transition>
            <div className={`container max-w-2xl`}>
              <Bio />
            </div>
            <Footer />
          </>
        )
      }}
    />
  )
}

export default Layout
