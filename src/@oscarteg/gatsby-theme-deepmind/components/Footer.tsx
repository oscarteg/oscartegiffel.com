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
    <DeepMindFooter className="mt-12">
      <div className="container p-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-200 pt-8">
          <FooterList
            title="Software Development"
            items={[
              `Cloud computing, microservices, APIs, full stack web apps`,
            ]}
          />

          <FooterList
            title="Technologies"
            items={[
              `React/Vue/Svelte`,
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
            ]}
          />
          <FooterList
            title={`Projects currently working on`}
            items={[
              `Scrum application in React/Go with Graphql`,
              `Seedbox in Kubernetes`,
              `MacOS app for simple task list and pomodoro timer`,
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
