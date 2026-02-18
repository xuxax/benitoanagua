<script lang="ts">
	import { page } from '$app/state';

	interface NavItem {
		label: string;
		href: string;
	}

	interface Props {
		navItems?: NavItem[];
		showBackButton?: boolean;
	}

	let { navItems = [], showBackButton = false }: Props = $props();
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
						<h1>Benito Anagua Ibarra</h1>
						<p>Professional Profile</p>
					</div>
				</a>
			</div>

			<div class="header-right">
				{#if showBackButton}
					<a href="/" class="back-link">
						<span class="material-symbols-outlined">arrow_back</span>
						<span class="back-text">Back to Hub</span>
					</a>
				{/if}

				<nav class="header-nav">
					{#each navItems as item}
						<a href={item.href} class="nav-link" class:active={page.url.pathname === item.href}>
							{item.label}
						</a>
					{/each}
				</nav>

				<div class="status-indicator">
					<span class="status-dot"></span>
					<span class="status-text">Available</span>
				</div>
			</div>
		</div>
	</header>

	<main class="portal-main">
		<slot />
	</main>

	<footer class="portal-footer">
		<div class="footer-container">
			<div class="footer-left">
				<span class="copyright">© {new Date().getFullYear()} Benito Anagua Ibarra</span>
			</div>
			<div class="footer-right">
				<span class="footer-location">Tarija, Bolivia</span>
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
		background-image: var(--blueprint-grid);
		background-size: 40px 40px;
		position: relative;
	}

	/* Header */
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
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.header-container {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 2rem;
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
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-container);
	}

	.logo-icon .material-symbols-outlined {
		font-size: 1.25rem;
		color: var(--color-primary);
	}

	.logo-text h1 {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		line-height: 1;
	}

	.logo-text p {
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		margin: 0.25rem 0 0 0;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.back-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-on-surface-variant);
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: color 0.2s ease;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.back-link .material-symbols-outlined {
		font-size: 1rem;
	}

	.header-nav {
		display: none;
		align-items: center;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.header-nav {
			display: flex;
		}
	}

	.nav-link {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		color: var(--color-on-surface-variant);
		padding: 0.375rem 0.5rem;
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-link.active {
		color: var(--color-primary);
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: var(--color-primary);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.status-text {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
	}

	/* Main */
	.portal-main {
		flex: 1;
		width: 100%;
		max-width: 80rem;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	@media (min-width: 768px) {
		.portal-main {
			padding: 3rem 2rem;
		}
	}

	/* Footer */
	.portal-footer {
		border-top: 1px solid var(--color-outline-variant);
		background-color: var(--color-surface-container);
		padding: 1.5rem;
	}

	.footer-container {
		max-width: 80rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	@media (min-width: 768px) {
		.footer-container {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.copyright {
		font-size: 0.6875rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
	}

	.footer-location {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
	}
</style>
