import React from 'react'
import FooterList from './FooterList'
import { StaticQuery, graphql } from 'gatsby';

const Footer = () => (
  <StaticQuery 
  query={graphql`
    {
      site {
        siteMetadata {
          github
        }
      }
    }
  `}
  render={data => (
    <footer className="bg-white mt-24">
      <div className="max-w-lg mx-auto pt-2">
        <div className="md:flex mb-4 text-center md:text-left justify-center">
          <FooterList
            title={'Frontend'}
            items={[
              'ES 5/6/7 en Typescript',
              'React (Redux / SPA met React Router)',
              'Vue (Vuex / SPA met Vue Router)',
              'React Native',
              'CSS (SCSS/SASS)',
              'Bootstrap/Bulma/Tailwindcss',
              'Android (beginner)',
            ]}
          />

          <FooterList
            title={'Backend'}
            items={['PHP (Laravel)', 'Java', 'GoLang (beginner)']}
          />

          <FooterList
            title={'Database/Devops'}
            items={[
              'Docker',
              'Gitlab CI/CD',
              'Linux',
              'MySQL',
              'Postgresql',
              'Nginx/Apache',
              'Vagrant',
              'Ansible',
            ]}
          />
        </div>
        <div className="flex justify-center text-grey font-hairline text-sm">
          <div className="py-8">© Copyright - {new Date().getFullYear()} - Source on <a target="_blank"
            rel="noopener noreferrer" href={data.site.siteMetadata.github}>github</a></div> 
        </div>
      </div>
    </footer>
  )}

  />
  
)

export default Footer
