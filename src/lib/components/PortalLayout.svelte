<script lang="ts">
	import { page } from '$app/state';
	import { loadSiteData } from '$lib/data/site-loader';
	import { getPersonalInfo } from '$lib/data/cv-loader';
	import type { PersonalInfo } from '$lib/types/CV';

	import { lang } from '$lib/state/lang.svelte';

	interface NavItem {
		label: string;
		href: string;
	}

	interface Props {
		navItems?: NavItem[];
		showBackButton?: boolean;
		children?: import('svelte').Snippet;
	}

	let { navItems = [], showBackButton = false, children }: Props = $props();

	// Datos reactivos al idioma
	const site = $derived(loadSiteData());
	const personal = $derived(getPersonalInfo());

	// Resuelve la URL de un link del footer usando href_key → PersonalInfo
	function resolveHref(link: { href_key: string; mailto?: boolean }): string {
		const key = link.href_key as keyof PersonalInfo;
		const value = personal[key] ?? '#';
		return link.mailto ? `mailto:${value}` : String(value);
	}

	// Lee el tema del DOM y lo observa para mantener el ícono sincronizado
	let isDark = $state(true);

	$effect(() => {
		const observer = new MutationObserver(() => {
			isDark = document.documentElement.getAttribute('data-theme') === 'dark';
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
		isDark = document.documentElement.getAttribute('data-theme') === 'dark';
		return () => observer.disconnect();
	});

	function toggleTheme() {
		const newTheme = isDark ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}

	function toggleLang() {
		lang.set(lang.current === 'es' ? 'en' : 'es');
	}
</script>

<div class="portal-wrapper">
	<!-- ══ PORTAL HEADER ══ -->
	<header class="portal-toolbar">
		<div class="toolbar-inner">
			<div class="toolbar-left">
				<a href="/" class="toolbar-logo">
					<div class="logo-box mono">[B_A]</div>
					<div class="logo-info">
						<span class="logo-main mono">{personal.name.toUpperCase()}</span>
						<span class="logo-meta mono">V.2026 / {site.meta.tagline.toUpperCase()}</span>
					</div>
				</a>
			</div>

			<div class="toolbar-right">
				{#if showBackButton}
					<a href="/" class="toolbar-back">
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="mono">{site.nav.back_label}</span>
					</a>
				{/if}

				<nav class="toolbar-nav">
					{#each navItems as item}
						<a href={item.href} class="toolbar-link" class:active={page.url.pathname === item.href}>
							{item.label}
						</a>
					{/each}
				</nav>

				<div class="toolbar-actions">
					<button
						class="tool-btn lang-btn"
						onclick={toggleLang}
						aria-label={site.nav.lang_toggle_aria}
					>
						{lang.current.toUpperCase()}
					</button>

					<button
						class="tool-btn theme-btn"
						onclick={toggleTheme}
						aria-label={site.nav.theme_toggle_aria}
					>
						<span class="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
					</button>
				</div>

				<div class="toolbar-status">
					<details class="cv-dropdown">
						<summary class="cv-trigger mono">
							<span class="status-pulse"></span>
							<span>DOWNLOAD_CV_MODULE</span>
							<span class="material-symbols-outlined dropdown-caret">expand_more</span>
						</summary>
						<ul class="cv-menu mono">
							<li class="menu-label">ESPAÑOL</li>
							<li>
								<a href="/cv/BenitoAnagua_DesarrolladorFrontend_ES.pdf" download
									>Desarrollador Frontend</a
								>
							</li>
							<li><a href="/cv/BenitoAnagua_DisennadorUIUX_ES.pdf" download>Diseñador UI/UX</a></li>
							<li>
								<a href="/cv/BenitoAnagua_DisennadorGrafico_ES.pdf" download>Diseñador Gráfico</a>
							</li>
							<li class="menu-divider"></li>
							<li class="menu-label">ENGLISH</li>
							<li>
								<a href="/cv/BenitoAnagua_FrontendDeveloper_EN.pdf" download>Frontend Developer</a>
							</li>
							<li><a href="/cv/BenitoAnagua_UXUIDesigner_EN.pdf" download>UI/UX Designer</a></li>
							<li>
								<a href="/cv/BenitoAnagua_GraphicDesigner_EN.pdf" download>Graphic Designer</a>
							</li>
						</ul>
					</details>
				</div>
			</div>
		</div>
	</header>

	<main class="portal-content">
		{@render children?.()}
	</main>

	<!-- ══ PORTAL FOOTER ══ -->
	<footer class="portal-baseboard">
		<div class="shared-boundary">
			<!-- Identity Node -->
			<div class="baseboard-module module--identity">
				<div class="module-header">
					<span class="material-symbols-outlined module-ico">architecture</span>
					<span class="font-display module-name">{personal.name.toUpperCase()}</span>
				</div>
				<p class="module-bio">{site.footer.bio}</p>
				<div class="module-signals">
					{#each site.footer.sections.portfolio.links as link}
						<a href={resolveHref(link)} target="_blank" rel="noopener" class="signal-link mono">
							<span class="material-symbols-outlined">{link.icon}</span>
							<span class="link-label">{link.label.toUpperCase()}</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Communication Channels -->
			<div class="baseboard-module module--channels">
				<h3 class="module-label mono">{site.footer.sections.contact.title.toUpperCase()}</h3>
				<ul class="channel-list">
					{#each site.footer.sections.contact.links as link}
						<li>
							<a href={resolveHref(link)} class="channel-node">
								<span class="material-symbols-outlined">{link.icon}</span>
								<span class="mono label-txt">{link.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="baseboard-lower">
			<div class="lower-inner">
				<span class="legal mono">© {new Date().getFullYear()} ARCHITECTURAL_CORE</span>
				<div class="lower-trace">
					<div class="line"></div>
					<span class="mono opacity-40">AUTO_LOG::OK</span>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	.portal-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--color-background);
	}

	/* ── TOOLBAR ── */
	.portal-toolbar {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-outline-variant);
		backdrop-filter: blur(12px);
	}

	.toolbar-inner {
		max-width: var(--container-xl);
		margin: 0 auto;
		height: 64px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 var(--space-4);
	}

	.toolbar-logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		color: var(--color-on-surface);
	}

	.logo-box {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface-container);
		border: 1px solid var(--color-outline-variant);
		color: var(--color-primary);
		font-weight: 700;
		font-size: 0.875rem;
	}

	.logo-info {
		display: flex;
		flex-direction: column;
	}

	.logo-main {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-on-surface);
		letter-spacing: 0.1em;
	}

	.logo-meta {
		font-size: 0.5rem;
		color: var(--color-primary);
		font-weight: 700;
		opacity: 0.7;
	}

	.toolbar-right {
		display: flex;
		align-items: center;
		gap: var(--space-8);
	}

	.toolbar-back {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		text-decoration: none;
		color: var(--color-primary);
		font-size: 0.625rem;
		font-weight: 700;
	}

	.toolbar-nav {
		display: none;
		gap: var(--space-6);
	}
	@media (min-width: 1024px) {
		.toolbar-nav {
			display: flex;
		}
	}

	.toolbar-link {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		text-decoration: none;
		color: var(--color-on-surface-variant);
		padding: var(--space-1) 0;
		border-bottom: 1.5px solid transparent;
		transition: all 0.2s;
	}
	.toolbar-link:hover {
		color: var(--color-primary);
	}
	.toolbar-link.active {
		color: var(--color-on-surface);
		border-bottom-color: var(--color-on-surface);
	}

	.toolbar-actions {
		display: flex;
		gap: 1px;
		background: var(--color-outline-variant);
		border: 1px solid var(--color-outline-variant);
	}

	.tool-btn {
		background: var(--color-surface);
		height: 32px;
		padding: 0 var(--space-3);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-on-surface);
		transition: background 0.2s;
	}
	.tool-btn:hover {
		background: var(--color-surface-container-low);
		color: var(--color-primary);
	}
	.tool-btn .material-symbols-outlined {
		font-size: 1rem;
	}

	/* ── STATUS / CV DROPDOWN ── */
	.toolbar-status {
		display: none;
		position: relative;
	}
	@media (min-width: 1024px) {
		.toolbar-status {
			display: block;
			margin-left: var(--space-6);
			padding-left: var(--space-6);
			border-left: 1px solid var(--color-outline-variant);
			height: 40px;
			display: flex;
			align-items: center;
		}
	}

	.cv-dropdown {
		position: relative;
	}

	.cv-trigger {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
		font-size: 0.75rem;
		color: var(--color-primary);
		opacity: 0.8;
		padding: 4px 8px;
		border: 1px solid transparent;
		transition: all 0.2s;
		list-style: none; /* Hide default triangle */
	}
	.cv-trigger::-webkit-details-marker {
		display: none;
	}
	.cv-trigger:hover {
		opacity: 1;
		background: var(--color-surface-container);
		border-color: var(--color-outline-variant);
	}

	.dropdown-caret {
		font-size: 1rem;
	}

	.cv-menu {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		width: 220px;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
		padding: var(--space-2) 0;
		display: flex;
		flex-direction: column;
		box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.2);
		z-index: 200;
	}

	.cv-menu li {
		display: flex;
	}

	.cv-menu a {
		padding: var(--space-2) var(--space-4);
		font-size: 0.75rem;
		color: var(--color-on-surface);
		text-decoration: none;
		width: 100%;
		transition: background 0.2s;
	}
	.cv-menu a:hover {
		background: var(--color-surface-container);
		color: var(--color-primary);
	}

	.menu-label {
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		padding: var(--space-2) var(--space-4);
		opacity: 0.6;
		font-weight: 700;
		margin-top: var(--space-1);
	}
	.menu-label:first-child {
		margin-top: 0;
	}

	.menu-divider {
		height: 1px;
		background: var(--color-outline-variant);
		margin: var(--space-1) 0;
	}

	.status-pulse {
		width: 6px;
		height: 6px;
		background: var(--color-primary);
		border-radius: 50%;
		box-shadow: 0 0 0 2px var(--color-primary-container);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(var(--color-primary-rgb), 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0);
		}
	}

	/* ── MAIN CONTENT ── */
	.portal-content {
		flex: 1;
		width: 100%;
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: var(--space-6) var(--space-4);
	}

	/* ── BASEBOARD (Footer) ── */
	.portal-baseboard {
		background: var(--color-surface-container-lowest);
		border-top: 1px solid var(--color-outline-variant);
		margin-top: var(--space-12);
	}

	.shared-boundary {
		max-width: var(--container-xl);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		.shared-boundary {
			grid-template-columns: 2fr 1fr;
		}
	}

	.baseboard-module {
		padding: var(--space-12) var(--space-6);
	}

	.module--identity {
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.module--identity {
			border-bottom: none;
			border-right: 1px solid var(--color-outline-variant);
		}
	}

	.module-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.module-ico {
		color: var(--color-primary);
		font-size: 1.5rem;
	}

	.module-name {
		font-size: 1.25rem;
		color: var(--color-on-surface);
	}

	.module-bio {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-on-surface-variant);
		max-width: 45ch;
		margin-bottom: var(--space-8);
	}

	.module-signals {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	@media (min-width: 640px) {
		.module-signals {
			flex-direction: row;
			gap: var(--space-6);
		}
	}

	.signal-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		text-decoration: none;
		color: var(--color-on-surface-variant);
		font-size: 0.6875rem;
		font-weight: 700;
		transition: color 0.2s;
	}

	.signal-link:hover {
		color: var(--color-primary);
	}

	.signal-link .material-symbols-outlined {
		font-size: 1rem;
	}

	.module-label {
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-primary);
		margin-bottom: var(--space-6);
		letter-spacing: 0.1em;
	}

	.channel-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.channel-node {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		color: var(--color-on-surface-variant);
		font-size: 0.8125rem;
		transition: all 0.2s;
	}

	.channel-node:hover {
		color: var(--color-on-surface);
		transform: translateX(4px);
	}

	.channel-node .material-symbols-outlined {
		font-size: 1.125rem;
		color: var(--color-primary);
	}

	.baseboard-lower {
		border-top: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
	}

	.lower-inner {
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: var(--space-4) var(--space-6);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.legal {
		font-size: 0.5625rem;
		opacity: 0.5;
	}

	.lower-trace {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.lower-trace .line {
		width: 40px;
		height: 1px;
		background: var(--color-primary);
		opacity: 0.3;
	}
</style>
