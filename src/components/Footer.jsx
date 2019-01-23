import React from 'react'
import FooterList from './FooterList'

const Footer = () => (
  <footer className="bg-white mt-24">
    <div className="max-w-lg mx-auto pt-2">
      <div className="md:flex mb-4 text-center md:text-left justify-center">
        <FooterList
          title={'Frontend'}
          items={[
            'ES 5/6/7',
            'React',
            'Vue 2',
            'React Native',
            'CSS (SCSS/SASS)',
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
        <div className="py-8">© Copyright - {new Date().getFullYear()}</div>
      </div>
    </div>
  </footer>
)

export default Footer
