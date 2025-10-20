import { createSignal, For } from "solid-js";

const ChevronUp = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill={"none"}
	>
		<title>Chevron up</title>
		<path
			d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const ChevronDown = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill={"none"}
	>
		<title>Chevron down</title>
		<path
			d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const X = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill={"none"}
	>
		<title>X</title>
		<path
			d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const Menu = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill={"none"}
	>
		<title>Menu</title>
		<path
			d="M4 5L16 5"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M4 12L20 12"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M4 19L12 19"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const menuItems = [
	{ name: "Home", link: "/" },
	{ name: "Blog", link: "/blog" },
	{ name: "Uses", link: "/uses" },
	{ name: "Workflow", link: "/workflow" },
	{ name: "Roadmap", link: "/roadmap" },
	{ name: "Principles", link: "/principles" },
];

const sections = [
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
		items: ["Excalidraw / Eraser.io", "Presentify", "Repl.it", "Loom"],
	},
];

export function MobileMenu() {
	const [isOpen, setIsOpen] = createSignal(false);
	const [expandedSection, setExpandedSection] = createSignal<string | null>(
		null,
	);

	const toggleMenu = () => {
		return setIsOpen(!isOpen());
	};
	const toggleSection = (title: string) => {
		setExpandedSection((prev) => (prev === title ? null : title));
	};

	return (
		<>
			<button
				type="button"
				onClick={toggleMenu}
				class="fixed top-4 right-4 z-50 p-2 bg-white rounded-full md:hidden"
			>
				{isOpen() ? <X /> : <Menu />}
			</button>

			{isOpen() && (
				<nav class="fixed inset-0 bg-white z-40 overflow-y-auto pt-16 pb-8 px-6">
					<ul class="space-y-4">
						<For each={menuItems}>
							{(item) => (
								<li>
									<a
										href={item.link}
										class="block py-2 text-lg hover:text-primary transition-colors"
									>
										{item.name}
									</a>
								</li>
							)}
						</For>
					</ul>

					<div class="mt-8 space-y-6 ">
						<For each={sections}>
							{(section) => (
								<div>
									<button
										type="button"
										onClick={() => toggleSection(section.title)}
										class="flex justify-between items-center w-full text-left py-2 text-xl font-semibold"
									>
										{section.title}
										{expandedSection() === section.title ? (
											<ChevronUp />
										) : (
											<ChevronDown />
										)}
									</button>
									{expandedSection() === section.title && (
										<ul class="mt-2 ml-4 space-y-2">
											<For each={section.items}>
												{(item) => <li class="text-sm ">{item}</li>}
											</For>
										</ul>
									)}
								</div>
							)}
						</For>
					</div>
				</nav>
			)}
		</>
	);
}
