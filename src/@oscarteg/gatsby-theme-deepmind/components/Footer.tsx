import DeepMindFooter from "@oscarteg/gatsby-theme-deepmind/src/components/Footer";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import FooterList from "../../../components/FooterList";

export type FooterProps = {};

export default function Footer(props: FooterProps) {
  const data = useStaticQuery(graphql`
    {
      currentBuildDate {
        currentDate
      }
      site {
        siteMetadata {
          repo
        }
      }
    }
  `);

  return (
    <DeepMindFooter>
      <div className="container border-t border-gray-200 pt-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <FooterList
              title="Frontend"
              items={[
                `ES 5/6/7 en Typescript`,
                `React (Redux / GatsbyJs / SPA met React Router)`,
                `Vue (Vuex / Vuepress / SPA met Vue Router)`,
                `React Native`,
                `CSS (SASS)`,
                `Bootstrap / Bulma / Tailwindcss`,
                `REST/Graphql`,
                `Android (beginner)`,
              ]}
            />
          </div>

          <div className="flex flex-col items-center">
            <FooterList
              title="Backend"
              items={[`PHP (Laravel)`, `Java`, `GoLang (beginner)`]}
            />
          </div>

          <div className="flex flex-col items-center">
            <FooterList
              title="Database/Devops"
              items={[
                `Docker`,
                `Gitlab CI/CD`,
                `Linux`,
                `MySQL`,
                `Postgresql`,
                `Nginx/Apache`,
                `Vagrant`,
                `Ansible`,
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center align-center text-grey font-hairline text-sm text-center">
        <div className="mb-2">
          © Copyright - {new Date().getFullYear()} - Source on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data.site.siteMetadata.repo}
          >
            github
          </a>
          - Built on {data.currentBuildDate.currentDate}
        </div>
      </div>
    </DeepMindFooter>
  );
}
