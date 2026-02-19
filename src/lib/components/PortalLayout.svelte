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
					<div class="logo-box">
						<span class="material-symbols-outlined logo-ico">architecture</span>
					</div>
					<div class="logo-info">
						<span class="logo-main">{personal.name.toUpperCase()}</span>
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
					<span class="status-pulse"></span>
					<span class="status-msg mono">SYS_OPERATIONAL</span>
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
		border-bottom: 2px solid var(--color-on-surface);
		backdrop-filter: blur(12px);
	}

	.toolbar-inner {
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: var(--space-2) var(--space-4);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.toolbar-logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		color: inherit;
	}

	.logo-box {
		width: 36px;
		height: 36px;
		border: 1.5px solid var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-container);
	}

	.logo-ico {
		font-size: 1.25rem;
		color: var(--color-primary);
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

	.toolbar-status {
		display: none;
		align-items: center;
		gap: var(--space-2);
		padding: 0 var(--space-3);
		height: 32px;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.toolbar-status {
			display: flex;
		}
	}

	.status-pulse {
		width: 6px;
		height: 6px;
		background: #22c55e;
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
		animation: status-blink 2s infinite;
	}
	@keyframes status-blink {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.4;
			transform: scale(0.8);
		}
	}
	.status-msg {
		font-size: 0.5rem;
		color: #22c55e;
		font-weight: 700;
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
		border-top: 2px solid var(--color-on-surface);
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
