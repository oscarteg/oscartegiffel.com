/**
 * The résumé, as data. Edit this file to change /resume; the page and the
 * print stylesheet read from it. Ported from the old standalone resume app.
 */

export type Contact = { label: string; value: string; href: string };
export type Skill = { label: string; value: string };
export type Experience = {
	company: string;
	via?: string;
	role: string;
	period: string;
	summary: string;
	bullets: string[];
	stack: string[];
};
export type Project = { name: string; stack: string; description: string };
export type EducationGroup = {
	label: string;
	entries: { title: string; meta?: string }[];
};

export const person = {
	name: "Oscar te Giffel",
	title: "Freelance Tech Lead · Systems Developer",
	location: "Amersfoort, The Netherlands",
	contacts: [
		{
			label: "email",
			value: "oscar@tegiffel.com",
			href: "mailto:oscar@tegiffel.com",
		},
		{
			label: "site",
			value: "oscartegiffel.com",
			href: "https://oscartegiffel.com",
		},
		{
			label: "github",
			value: "github.com/oscarteg",
			href: "https://github.com/oscarteg",
		},
		{
			label: "linkedin",
			value: "linkedin.com/in/otegiffel",
			href: "https://www.linkedin.com/in/otegiffel/",
		},
	] satisfies Contact[],
};

export const profile = {
	lead: "Hi, I'm Oscar — Freelance Tech Lead through Createch and currently senior frontend at DPG Media. Previously IT Tech Lead at Pixcelium (MedTech compliance SaaS) and Chapter Lead Frontend at HeadFWD.",
	body: "Eight years shipping systems — Vanilla JS → React, PHP → Kotlin, monolith → microservices, CRUD forms → xState machines. I care about more than the stack: aligning teams and building a healthy engineering culture is where I do my best work. Depth in frontend architecture, Domain-Driven Design, TypeScript, and team leadership. Next step: principal / staff work — technical strategy and mentoring.",
};

export const skills: Skill[] = [
	{
		label: "Languages",
		value:
			"TypeScript, JavaScript, Kotlin, Java, Python, Go, Rust, Zig, PHP, HTML, (S)CSS / SASS",
	},
	{
		label: "Frontend",
		value:
			"React (Next.js, Remix, Gatsby, Astro), React Native, Vue (Nuxt), Svelte (SvelteKit), Storybook",
	},
	{
		label: "State & Data",
		value:
			"TanStack Query, Redux, Zustand, xState, Apollo, GraphQL, React Hook Form",
	},
	{
		label: "Styling & UI",
		value: "TailwindCSS, Styled Components, Radix, MUI, shadcn/ui",
	},
	{
		label: "Backend",
		value:
			"Spring Boot, Ktor, Quarkus, NestJS, Express, Laravel, Django. JUnit, Mockito, Hibernate",
	},
	{
		label: "Architecture",
		value:
			"Domain-Driven Design, Clean & Hexagonal Architecture, Event Sourcing, CQRS, Microservices, Serverless, REST, HATEOAS, gRPC, Finite State Machines, TDD",
	},
	{
		label: "Testing",
		value: "Vitest, Jest, Cypress, Playwright, React Testing Library",
	},
	{
		label: "Platform",
		value:
			"Docker, Kubernetes, Helm, Terraform, Ansible, AWS, GitOps, CI/CD (GitLab, GitHub Actions, Jenkins)",
	},
	{
		label: "Data",
		value: "PostgreSQL, MySQL, MongoDB, Redis, InfluxDB, Kafka",
	},
	{ label: "Tooling", value: "Vite, Webpack, pnpm, Bun, Git, Figma" },
];

export const experience: Experience[] = [
	{
		company: "DPG Media",
		via: "freelance via Createch",
		role: "Senior Frontend Engineer",
		period: "2024 — Present",
		summary:
			"Brought in to move DPG's frontend off Vanilla JS onto React + Next.js. Pushing the org from components-as-a-service to components-as-a-product. Architecture direction plus hands-on delivery.",
		bullets: [
			"Built a video player component library end-to-end as the flagship product.",
			"Page-by-page migration to Next.js — no big-bang rewrite, no feature freeze.",
			"Set up CI/CD and pushed Domain-Driven Design on the Kotlin services behind it.",
			"Coached juniors through review, not rewrite — from ticket-takers to slice owners.",
		],
		stack: ["TypeScript", "React", "Next.js", "Kotlin", "DDD", "CI/CD"],
	},
	{
		company: "Pixcelium",
		role: "IT Tech Lead",
		period: "Jul 2024 — Feb 2026",
		summary:
			"Early-stage MedTech compliance SaaS. Owned technical direction in a regulated, slow-moving domain — the product made it simple, clear, and fast without slowing the customer's work.",
		bullets: [
			"Set the architecture from zero — stack choices, compliance tooling, hiring input.",
			"Product decisions lived between code and regulation.",
			"Shipped an MVP to MedTech customers; the stack held through the first compliance-audited releases.",
		],
		stack: ["TypeScript", "React", "JVM", "Node.js"],
	},
	{
		company: "KVK",
		via: "via HeadFWD",
		role: "Senior Frontend Developer",
		period: "Jun 2021 — Jan 2023",
		summary:
			"Senior lead on seven priority government services used by every business in the Netherlands. Owned frontend architecture, grew the team, pushed back on anything that broke accessibility.",
		bullets: [
			"Introduced Domain-Driven Design boundaries; kicked off monolith → micro-frontends.",
			"Modelled multi-step form flows as xState finite state machines — killed whole classes of submission bugs.",
			"Led a team of three frontend engineers and sat on the hiring panel.",
		],
		stack: [
			"TypeScript",
			"React",
			"Redux",
			"xState",
			"DDD",
			"Jest",
			"GitLab",
			"SonarQube",
		],
	},
	{
		company: "HeadFWD",
		role: "Chapter Lead Frontend · Senior Frontend Engineer",
		period: "Feb 2021 — Aug 2023",
		summary:
			"Chapter Lead across HeadFWD's frontend engineers alongside senior client delivery. Grew the technical bar of the discipline through chapter days, internal talks, and hiring input.",
		bullets: [
			"Chapter Lead — technical growth, chapter days, internal talks, standards across projects.",
			"Recruitment — owned technical assessment of frontend candidates; aligned interviewers.",
			"Innovation consultant — technical vision and hands-on work on client innovation projects.",
		],
		stack: ["TypeScript", "React", "Next.js", "DDD"],
	},
	{
		company: "Polariks",
		via: "via HeadFWD",
		role: "Senior Fullstack Developer",
		period: "Feb 2023 — Present",
		summary:
			"Data platform giving greenhouse growers insight into their cultivation. Improved both the Scrum process and the product's frontend and BFF.",
		bullets: [
			"Strengthened the Scrum process — worked with the team to find and remove bottlenecks.",
			"Built frontend and BFF in TypeScript + React over NestJS GraphQL; added caching and optimised GraphQL relations for heavy data aggregation.",
			"Coached junior developers.",
		],
		stack: [
			"React",
			"TypeScript",
			"NestJS",
			"GraphQL",
			"Apollo",
			"MUI",
			"InfluxDB",
			"Kubernetes",
			"Terraform",
		],
	},
	{
		company: "Deloitte",
		via: "via HeadFWD",
		role: "Senior Frontend Developer",
		period: "Mar 2021 — Jun 2021",
		summary:
			"Helped digitise Deloitte's gamified escape rooms — used to raise awareness on privacy, GDPR, and password hygiene.",
		bullets: [
			"Conceived, designed, and built several browser games (memory, mastermind variants) in Next.js, TypeScript, React, TailwindCSS.",
		],
		stack: ["Next.js", "React", "TypeScript", "TailwindCSS"],
	},
	{
		company: "Yokogawa",
		via: "via HeadFWD",
		role: "Senior Frontend Developer",
		period: "Jul 2019 — Jan 2020",
		summary:
			"Market leader in process-industry technology. Set up and led the frontend for the control screens used on plant devices and computers.",
		bullets: [
			"Rebuilt a large part of the application, fully replacing the legacy Django frontend.",
			"Gathered and translated requirements with the product owner and business analysts.",
			"Handled browser compatibility on outdated devices — dropped to vanilla JS where needed — and helped refine the screen designs.",
		],
		stack: [
			"TypeScript",
			"React",
			"Styled Components",
			"jQuery",
			"SASS",
			"Agile",
		],
	},
	{
		company: "MoneyMonk",
		role: "Fullstack Developer",
		period: "Sep 2016 — Jul 2019",
		summary:
			"Early engineer at an accounting SaaS; came back later to lay a fresh frontend foundation while the product crossed startup → scale-up.",
		bullets: [
			"Migrated the frontend to React + Redux + TypeScript + Tailwind + React Query, module by module.",
			"Moved LAMP onto Docker + Kubernetes; wrote a Spring app to manage the cluster; led the backend shift to Kotlin.",
			"Built Touchpoint, an internal ticketing app, end-to-end with the team.",
			"Moved a React Native mobile app off native modules and added Redux for a large efficiency gain.",
			"Standardised tooling and coding guidelines so new hires ramped fast.",
		],
		stack: [
			"PHP",
			"React",
			"React Native",
			"Redux",
			"Node.js",
			"Kotlin",
			"Spring",
			"Docker",
			"Kubernetes",
			"MySQL",
			"Redis",
		],
	},
];

export const projects: Project[] = [
	{
		name: "Chewpy",
		stack: "Laravel · Vue · React Native",
		description:
			"A guide for people who want to eat vegetarian but don't know where to start. Built the REST API and CMS feeding the web app and two mobile clients; set up the server running the core application.",
	},
];

export const education: EducationGroup[] = [
	{
		label: "Education",
		entries: [
			{
				title: "BSc Informatica — Software Engineering",
				meta: "Hogeschool Leiden · 2013 — 2018",
			},
			{
				title: "Minor — Philosophy, World Religions, Spirituality",
				meta: "Hogeschool Utrecht · 2017 — 2018",
			},
		],
	},
	{
		label: "Training",
		entries: [
			{
				title: "Principal Dev — tech leadership & development process",
				meta: "2024",
			},
			{ title: "Total TypeScript — Matt Pocock" },
			{
				title:
					"Epic React, Testing JavaScript, Advanced React Patterns — Kent C. Dodds",
			},
			{ title: "UNLP · Mannenkracht — personal development" },
		],
	},
	{
		label: "Languages",
		entries: [
			{
				title:
					"Dutch (native) · English (fluent) · Japanese (learning — JLPT N5)",
			},
		],
	},
];
