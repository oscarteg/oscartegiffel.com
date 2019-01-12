import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div className="max-w-full px-4">
    <div class="mx-auto max-w-2xl pt-12 pb-8">
      <h1 class="my-0 leading-loose text-4xl font-bold">
        The Basement
      </h1>
      <p class="text-2xl my-6 leading-loose">
        Thoughts &amp; insights on <strong class="highlight">Web Development</strong> with a focus on <strong class="highlight">Craft CMS</strong>, <strong class="highlight">Front-end Tools</strong> and <strong class="highlight">Best-Practices.</strong>
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
