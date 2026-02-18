<script lang="ts">
	import { page } from '$app/state';
	import { loadSiteData } from '$lib/data/site-loader';
	import { getPersonalInfo } from '$lib/data/cv-loader';
	import type { PersonalInfo } from '$lib/types/CV';

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

	const site = loadSiteData();
	const personal = getPersonalInfo();

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
</script>

<div class="portal-wrapper">
	<header class="portal-header">
		<div class="header-container">
			<div class="header-left">
				<a href="/" class="logo-link">
					<div class="logo-icon">
						<span class="material-symbols-outlined">architecture</span>
					</div>
					<div class="logo-text">
						<span class="logo-name">{personal.name}</span>
						<span class="logo-sub">{site.meta.tagline}</span>
					</div>
				</a>
			</div>

			<div class="header-right">
				{#if showBackButton}
					<a href="/" class="back-link">
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="back-text">{site.nav.back_label}</span>
					</a>
				{/if}

				<nav class="header-nav">
					{#each navItems as item}
						<a href={item.href} class="nav-link" class:active={page.url.pathname === item.href}>
							{item.label}
						</a>
					{/each}
				</nav>

				<button
					class="theme-toggle"
					onclick={toggleTheme}
					aria-label="Cambiar tema"
					id="theme-toggle-btn"
				>
					<span class="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
				</button>

				<div class="status-indicator">
					<span class="status-dot"></span>
					<span class="status-text">{site.nav.available_label}</span>
				</div>
			</div>
		</div>
	</header>

	<main class="portal-main">
		{@render children?.()}
	</main>

	<footer class="portal-footer">
		<div class="footer-container">
			<!-- Columna identidad -->
			<div class="footer-col footer-col--identity">
				<div class="footer-logo">
					<span class="material-symbols-outlined footer-logo-icon">architecture</span>
					<div>
						<span class="footer-name">{personal.name}</span>
						<span class="footer-tagline">{site.meta.tagline}</span>
					</div>
				</div>
				<p class="footer-bio">{site.footer.bio}</p>
			</div>

			<!-- Portafolio -->
			<div class="footer-col">
				<h3 class="footer-col-title">{site.footer.sections.portfolio.title}</h3>
				<ul class="footer-links">
					{#each site.footer.sections.portfolio.links as link}
						<li>
							<a href={resolveHref(link)} target="_blank" rel="noopener" class="footer-link">
								<span class="material-symbols-outlined">{link.icon}</span>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contacto -->
			<div class="footer-col">
				<h3 class="footer-col-title">{site.footer.sections.contact.title}</h3>
				<ul class="footer-links">
					{#each site.footer.sections.contact.links as link}
						<li>
							<a
								href={resolveHref(link)}
								target={link.mailto ? undefined : '_blank'}
								rel="noopener"
								class="footer-link"
								class:footer-link--accent={link.accent}
							>
								<span class="material-symbols-outlined">{link.icon}</span>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<div class="footer-bottom-inner">
				<span class="footer-copy">© {new Date().getFullYear()} {personal.name}</span>
				<div class="footer-profiles">
					{#each site.nav.profiles as profile, i}
						{#if i > 0}<span class="footer-sep">·</span>{/if}
						<a
							href={profile.href}
							class="footer-profile-link"
							class:active={page.url.pathname === profile.href}
						>
							{profile.label}
						</a>
					{/each}
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
		color: var(--color-on-background);
		background-image: var(--blueprint-grid-light);
		background-size: 40px 40px;
	}

	:global([data-theme='dark']) .portal-wrapper {
		background-image: var(--blueprint-grid-dark);
	}

	/* ── Header ── */
	.portal-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: var(--color-surface-container);
		border-bottom: 1px solid var(--color-outline-variant);
		backdrop-filter: blur(8px);
	}

	.header-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0.875rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	@media (min-width: 768px) {
		.header-container {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0.875rem 2rem;
		}
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: inherit;
	}

	.logo-icon {
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-container);
		flex-shrink: 0;
	}

	.logo-icon .material-symbols-outlined {
		font-size: 1.125rem;
		color: var(--color-primary);
	}

	.logo-text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.logo-name {
		font-size: 0.9375rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		line-height: 1;
		color: var(--color-on-surface);
	}

	.logo-sub {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-primary);
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.back-link {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		text-decoration: none;
		color: var(--color-on-surface-variant);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		transition: color 0.2s ease;
	}

	.back-link:hover {
		color: var(--color-primary);
	}
	.back-link .material-symbols-outlined {
		font-size: 0.875rem;
	}

	.header-nav {
		display: none;
		align-items: center;
		gap: 1.25rem;
	}

	@media (min-width: 768px) {
		.header-nav {
			display: flex;
		}
	}

	.nav-link {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		text-decoration: none;
		color: var(--color-on-surface-variant);
		padding: 0.25rem 0;
		border-bottom: 1px solid transparent;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}
	.nav-link.active {
		color: var(--color-primary);
		border-bottom-color: var(--color-primary);
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
		flex-shrink: 0;
	}

	.theme-toggle:hover {
		border-color: var(--color-primary);
		background: var(--color-primary-container);
	}

	.theme-toggle .material-symbols-outlined {
		font-size: 1.125rem;
		color: var(--color-on-surface);
	}

	.status-indicator {
		display: none;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.625rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 640px) {
		.status-indicator {
			display: flex;
		}
	}

	.status-dot {
		width: 0.4375rem;
		height: 0.4375rem;
		background: #22c55e;
		border-radius: 50%;
		animation: blink 2s ease-in-out infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.status-text {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #22c55e;
	}

	/* ── Main ── */
	.portal-main {
		flex: 1;
		width: 100%;
		max-width: 72rem;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	@media (min-width: 768px) {
		.portal-main {
			padding: 3rem 2rem;
		}
	}

	/* ── Footer ── */
	.portal-footer {
		border-top: 1px solid var(--color-outline-variant);
		background-color: var(--color-surface-container-low);
	}

	.footer-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 3rem 1.5rem 2rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 640px) {
		.footer-container {
			grid-template-columns: repeat(2, 1fr);
			padding: 3rem 2rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.footer-container {
			grid-template-columns: 2fr 1fr 1fr;
		}
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.footer-col--identity {
		gap: 1.25rem;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.footer-logo-icon {
		font-size: 1.75rem;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.footer-name {
		display: block;
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-on-surface);
		line-height: 1;
	}

	.footer-tagline {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-primary);
		margin-top: 0.25rem;
	}

	.footer-bio {
		font-size: 0.8125rem;
		line-height: 1.65;
		color: var(--color-on-surface-variant);
		margin: 0;
		max-width: 28rem;
	}

	.footer-col-title {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-on-surface-variant);
		margin: 0;
		padding-bottom: 0.625rem;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		transition: color 0.2s ease;
		padding: 0.125rem 0;
	}

	.footer-link:hover {
		color: var(--color-primary);
	}

	.footer-link .material-symbols-outlined {
		font-size: 0.875rem;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.footer-link--accent {
		color: var(--color-on-surface);
	}

	/* Footer bottom */
	.footer-bottom {
		border-top: 1px solid var(--color-outline-variant);
		background: var(--color-surface-container);
	}

	.footer-bottom-inner {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0.875rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	@media (min-width: 640px) {
		.footer-bottom-inner {
			flex-direction: row;
			justify-content: space-between;
			padding: 0.875rem 2rem;
		}
	}

	.footer-copy {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		opacity: 0.6;
	}

	.footer-profiles {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer-profile-link {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.footer-profile-link:hover,
	.footer-profile-link.active {
		color: var(--color-primary);
	}

	.footer-sep {
		font-size: 0.5625rem;
		color: var(--color-on-surface-variant);
		opacity: 0.3;
	}
</style>
