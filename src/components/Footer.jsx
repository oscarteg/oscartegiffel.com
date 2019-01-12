import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => (
  <footer className="bg-white mt-24">
    <div className="max-w-lg mx-auto pt-2">
        <div className="md:flex mb-4">
            <div className="md:w-1/4 sm:mx-auto">
                <h4 className="font-mono uppercase tracking-wide text-xs py-3 font-hairline font-bold">
                    Webdevelopment
                </h4>

                <ul className="tracking-wide font-hairline">
                    <FontAwesomeIcon icon={['fas', 'check']} className="text-yellow-dark"/>  Javascript 
                </ul>
            </div>
            <div className="md:w-1/4">
                <h4 className="text-grey"> Devops </h4>
                <ul>
                    <li>Docker</li>
                    <li>Gitlab CI/CD</li>
                </ul>
            </div>
            <div className="md:w-1/4">
                <h4 className="text-grey">Other</h4>

                <ul>
                    <li>React Native</li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="md:w-1/4"></div>
        </div>

        {/* <FontAwesomeIcon icon={['fab', 'linkedin']} /> */}
            © {new Date().getFullYear()}
    </div>
  </footer>
)

export default Footer
