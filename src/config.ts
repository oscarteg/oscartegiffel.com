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
		workExperience: [
			{
				period: "2023 — Present",
				role: "Senior Frontend Developer",
				company: "DPG Media",
				via: "freelance",
				description:
					"Building a <strong>video player component library</strong>, and pushing DPG to ship <strong>components as products</strong>, not services.",
				stack: ["React", "Next.js", "TypeScript", "Kotlin"],
			},
			{
				period: "2023",
				role: "Senior Fullstack Developer",
				company: "Polariks",
				via: "via HeadFWD",
				description:
					"Building the frontend for a <strong>greenhouse data platform</strong> — tuning GraphQL and caching to handle large datasets.",
				stack: ["React", "TypeScript", "GraphQL", "NestJS"],
			},
			{
				period: "2021 — 2023",
				role: "Senior Frontend Developer",
				company: "KVK",
				via: "via HeadFWD",
				description:
					"Leading frontend across <strong>seven services used by every Dutch business</strong> — introduced <strong>DDD</strong> and started the move to microservices.",
				stack: ["React", "TypeScript", "Redux", "xState"],
			},
		],
		projects: [
			{
				name: "JustWhisk",
				status: "In development",
				image: "/images/projects/justwhisk.webp",
				description:
					"Solving an annoying problem for myself and my family: online recipes buried under blog stories, and <strong>grandma's family recipes</strong> stuck on paper. Building a place that fixes both.",
				stack: ["TanStack Start", "React", "Convex", "TypeScript"],
				url: "https://justwhisk.com",
			},
		],
	},
} as const;
