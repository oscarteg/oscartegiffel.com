import DeepMindFooter from "@oscarteg/gatsby-theme-deepmind/src/components/Footer";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import FooterList from "../../../components/FooterList";

export default function Footer() {
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
    <DeepMindFooter className="mt-12">
      <div className="container p-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-200 pt-8">
          <FooterList
            title="Software Development"
            items={[
              `Cloud computing, microservices, APIs, full stack web apps`,
              `Hybrid mobile apps with Flutter`,
            ]}
          />

          <FooterList
            title="Technologies"
            items={[
              `JS&TS (React/Vue/Svelte)`,
              `PHP (Laravel)`,
              `Java/Kotlin`,
              `GoLang`,
            ]}
          />
          <FooterList
            title={`Future Ventures (Teach myself in ${new Date().getFullYear()})`}
            items={[
              `Scalable distributed systems (infrastructure, networks, microservices, kubernetes)`,
              `Creating mobile applications in Flutter`,
              `Working more with Graphql`,
              `Become better at solving algorithmic problems.`,
            ]}
          />
          <FooterList
            title={`Projects currently working on`}
            items={[
              `Scrum application in React/Go with Graphql`,
              `Seedbox in Kubernetes`,
              `A recipe webapp for the secret recipes of my family`,
              `CRM application with Laravel/TailwindCSS/Livewire/AlpineJS`,
              `Learning to be a better writer`,
            ]}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center align-center text-grey font-hairline text-sm text-center">
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
