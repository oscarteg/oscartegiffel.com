import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div className="container px-4 mx-auto">
    <div className="pt-12 pb-8">
      <div className="max-w-sm ml-8">
        <h1
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          {siteTitle}
        </h1>
      </div>
      <p className="text-2xl my-6 leading-loose">
        Software ontwikkelaar met een focus op <strong className="highlight">webdevelopment</strong> en een passie voor knutselen met <strong className="highlight">software</strong> .
      </p>
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
