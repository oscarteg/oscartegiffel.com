export const SITE_TITLE = "Oscar te Giffel";
export const SITE_DESCRIPTION = "Finding meaning in code, life and humans";
export const SITE_URL = "https://oscartegiffel.com";
export const SITE_LOGO = "/logo.png";

export const siteMetadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: SITE_LOGO,
  devMode: {
    showDraftPages: true,
  },
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/oscarteg",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/oscartegiffel",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/otegiffel",
    },
    {
      name: "Resume",
      url: "https://resume.oscartegiffel.com",
    },
  ],
  content: {
    uses: [
      {
        title: "Editor & Terminal",
        items: [
          "Terminal: Ghostty",
          "Editors: Neovim, Visual Studio Code, IntelliJ",
          "Font: Berkeley Mono",
          "Theme: Gruvbox Dark",
        ],
      },
      {
        title: "Teaching tools",
        items: ["Loom", "Presentify", "Excalidraw / Eraser.io", "Repl.it"],
      },
    ],
  },
} as const;
