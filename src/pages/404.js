import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from 'gatsby';

const NotFoundPage = ({ location }) => (
  <Layout location={location} className="text-center">
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

    <div className="mt-5" onClick={() => navigate('/')}>
      <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
        <FontAwesomeIcon
          icon={['fas', 'arrow-left']}
          className="fa-xs fill-current w-4 h-4 mr-2"
        />
        <span>Go Back</span>
      </button>
    </div>
  </Layout>
)

export default NotFoundPage