export const SITE_TITLE = "Oscar te Giffel";
export const SITE_DESCRIPTION = "Finding meaning in code, life and humans";
export const SITE_URL = "https://oscartegiffel.com";
export const SITE_LOGO = "/og/home.png";

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
	],
	content: {
		workExperience: [
			{
				period: "2023 — Present",
				role: "Senior Frontend Developer",
				company: "DPG Media",
				via: "Freelance",
				description:
					"Started as a Senior Developer for the Publishing Services; became the person teams across the company reach out to for a second opinion on code, vision and architecture. Introduced React best practices and frontend development as a whole.",
				highlights: [
					{
						title: "Legacy migration",
						body: "led the Javascript → React transition for high-traffic article and dossier pages, with heavy emphasis on developer experience.",
					},
					{
						title: "Design bridge",
						body: "initiated a multidimensional token system that works across brands, built with designers on Style Dictionary and Token Studio.",
					},
					{
						title: "Guardrail for quality",
						body: "gatekeeper for the React and UI repositories; no shortcuts that hurt us later, even when the pressure was on.",
					},
				],
				stack: ["React", "Next.js", "TypeScript", "Kotlin"],
			},
			{
				period: "2023",
				role: "Senior Fullstack Developer",
				company: "Polariks",
				via: "via HeadFWD",
				description:
					"Building the frontend for a greenhouse data platform — tuning GraphQL and caching to handle large datasets.",
				highlights: [],
				stack: ["React", "TypeScript", "GraphQL", "NestJS"],
			},
			{
				period: "2021 — 2023",
				role: "Senior Frontend Developer",
				company: "KVK",
				via: "via HeadFWD",
				description:
					"Leading frontend across seven services used by every Dutch business — introduced DDD and started the move to microservices.",
				highlights: [],
				stack: ["React", "TypeScript", "Redux", "xState"],
			},
		],
		projectsIntro:
			"Side projects double as my lab — each one solves a real problem for myself or my family.",
		projects: [
			{
				name: "JustWhisk",
				status: "In development",
				image: "/images/projects/justwhisk.webp",
				description:
					"Online recipes buried under blog stories, and grandma's family recipes stuck on paper. Building a place that fixes both.",
				stack: ["TanStack Start", "React", "Convex", "TypeScript"],
				url: "https://justwhisk.com",
			},
			{
				name: "Blackjack Learner",
				status: "In development",
				image: "/images/projects/blackjacklearner.webp",
				description:
					"A practice tool for learning basic strategy and card counting.",
				stack: ["SolidJS", "TypeScript"],
				url: "https://blackjack.oscartegiffel.com/",
			},
		],
	},
} as const;

export type UseItem = {
	name: string;
	description?: string;
	href?: string;
};

export type UseCategory = {
	title: string;
	items: UseItem[];
};

export const uses: UseCategory[] = [
	{
		title: "Editor & Terminal",
		items: [
			{ name: "Ghostty", description: "Terminal." },
			{
				name: "Neovim, Visual Studio Code, IntelliJ",
				description: "Editors, depending on the job.",
			},
			{ name: "Berkeley Mono", description: "Font." },
			{
				name: "Koda",
				description: "Neovim theme.",
				href: "https://github.com/oskarnurm/koda.nvim",
			},
		],
	},
	{
		title: "Development Workflow",
		items: [
			{
				name: "tmux + Neovim",
				description:
					"A simple combination of tmux with Neovim gives me the sweet spot to configure it specifically to my needs. How this all works can be found in my dotfiles.",
				href: "https://github.com/oscarteg/dotfiles",
			},
		],
	},
	{
		title: "Teaching Tools",
		items: [
			{ name: "Presentify", href: "https://presentify.app/" },
			{ name: "Excalidraw", href: "https://excalidraw.com" },
		],
	},
	{
		title: "macOS Apps",
		items: [
			{ name: "Linear", href: "https://linear.app/" },
			{
				name: "Aerospace",
				description: "Tiling window manager.",
				href: "https://nikitabobko.github.io/aerospace/guide",
			},
			{ name: "Raycast" },
			{ name: "Day One" },
			{ name: "Things" },
			{ name: "Habitify" },
			{ name: "Obsidian", href: "https://obsidian.md/" },
		],
	},
	{
		title: "Daily Process",
		items: [
			{
				name: "Things",
				description:
					"A simple Getting Things Done workflow. Every single task and thought goes into a bucket, and every week I review all of them. I don't do everything at once, but I never forget what needs to be done.",
			},
			{
				name: "Day One",
				description:
					"Every morning and evening I reflect on my goals and write it down.",
			},
		],
	},
	{
		title: "Learning Workflow",
		items: [
			{
				name: "Anki",
				description:
					"Stamping knowledge into my brain. Useful for learning a new language.",
			},
			{
				name: "Obsidian",
				description:
					"Note taking. No overengineering with the Zettelkasten method anymore.",
			},
			{ name: "Habitify", description: "Building new skills." },
		],
	},
	{
		title: "Gear",
		items: [
			{
				name: "Arc'teryx Mantis 26",
				description: "Daily backpack.",
				href: "https://arcteryx.com/products/mantis-26-backpack",
			},
			{
				name: "Bellroy Tech Kit Compact",
				description: "Cable case.",
				href: "https://www.bellroy.com/tech-kit",
			},
		],
	},
	{
		title: "Accessories",
		items: [
			{ name: "iPhone 15 Pro" },
			{ name: 'iPad Pro 11"' },
			{ name: "Apple Watch 5" },
			{ name: "AirPods Pro 3" },
		],
	},
	{
		title: "Workstation",
		items: [
			{ name: "MacBook Pro M4 16-inch 2024" },
			{
				name: "UGREEN Revodok Max 213",
				description:
					"13-in-1 Thunderbolt 4 dock, 40 Gbps — dual 4K at 60 Hz or single 8K.",
			},
			{ name: "LG Ergo 32UN880", description: "Monitor." },
			{ name: "Samsung Odyssey G7 LS32BG700EUXEN", description: "Monitor." },
			{ name: "Keychron Q10" },
			{ name: "Logitech C922 Webcam" },
			{ name: "Wacom Intuos M" },
			{ name: "Logitech MX Master 3" },
			{ name: "Herman Miller Aeron Chair" },
			{ name: "Shure MV6", description: "USB gaming microphone." },
			{
				name: "PC",
				description: "Full parts list on PCPartPicker.",
				href: "https://pcpartpicker.com/list/sNkNN6",
			},
		],
	},
];
