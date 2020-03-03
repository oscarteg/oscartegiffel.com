import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const rootPath = `${__PATH_PREFIX__}/`

const Header = ({ location, siteTitle }) => (
  <div className="container">
    <div className="pt-12 pb-8">
      {location.pathname === rootPath ? (
        <div>
          <div className="max-w-sm md:ml-20">
            <h1 className="cursor-pointer" onClick={() => navigate('/')}>
              {siteTitle}
            </h1>
          </div>
          <p className="text-2xl my-6 leading-loose">
            Software ontwikkelaar met een focus op{' '}
            <strong className="highlight">webdevelopment</strong> en een passie
            voor knutselen met <strong className="highlight">software</strong> .
          </p>
        </div>
      ) : (
        <div>
          <div className="ml-8 inline-block">
            <h3
              className="cursor-pointer highlight"
              onClick={() => navigate('/')}
            >
              {siteTitle}
            </h3>
          </div>
        </div>
      )}
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
