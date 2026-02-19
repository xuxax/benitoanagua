<script lang="ts">
	import { getAllFocuses, getPersonalInfo, getEducation } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import { SITE_URL } from '$lib/config';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const personal = $derived(getPersonalInfo());
	const focuses = $derived(getAllFocuses());
	const education = $derived(getEducation());
	const site = $derived(loadSiteData());

	const navItems = $derived(site.nav.profiles.map((p) => ({ label: p.label, href: p.href })));

	function getFocusSiteData(focusName: string) {
		return (
			site.nav.profiles.find((p) => p.href.includes(focusName)) || {
				code: '00',
				icon: 'architecture',
				href: '/'
			}
		);
	}
</script>

<svelte:head>
	<title>{personal.name} — {site.meta.tagline}</title>
	<meta name="description" content="{personal.name} — {site.meta.description}" />
	<meta
		name="keywords"
		content="portfolio, design, development, graphic design, interdisciplinary"
	/>

	<!-- Schema.org markup for home page -->
	<script type="application/ld+json">
		{{
			"@context": "https://schema.org",
			"@type": "ProfilePage",
			"mainEntity": {{
				"@type": "Person",
				"name": "{personal.name}",
				"description": "{site.meta.description}",
				"url": "{SITE_URL}",
				"jobTitle": "Interdisciplinary Creator",
				"knowsAbout": ["Design", "Development", "Graphic Design"]
			}}
		}}
	</script>
</svelte:head>

<PortalLayout {navItems}>
	<div class="lobby-container">
		<!-- ══ LOBBY HERO: Structural Narrative ══ -->
		<section class="lobby-hero">
			<section class="lobby-hero">
				<div class="header-terminal shared-boundary">
					<div class="terminal-top-bar mono">
						<span>BENITO ANAGUA // PORTFOLIO_INDEX</span>
						<span class="status-light"></span>
					</div>

					<div class="main-spec">
						<div class="hero-label mono">INTERDISCIPLINARY_HUB</div>

						<h1 class="hero-title">
							<span class="stroke-text">{personal.name.split(' ')[0]}</span>
							<span class="solid-text">{personal.name.split(' ')[1] || ''}</span>
						</h1>

						<div class="hero-divider">
							<div class="line"></div>
							<span class="mono">{site.meta.tagline.toUpperCase()}</span>
							<div class="line"></div>
						</div>

						<div class="hero-intro-box">
							<div class="summary-cursor"></div>
							<p class="hero-intro">{site.meta.description}</p>
						</div>
					</div>
				</div>
			</section>
		</section>

		<!-- ══ PATHS: Grid-Boundary System ══ -->
		<section class="paths-section">
			<div class="section-tag mono">SELECT_PATH_MODALITY</div>
			<div class="shared-boundary paths-grid">
				{#each focuses as focus}
					{@const sData = getFocusSiteData(focus.name)}
					<a
						href={sData.href}
						class="path-card"
						class:dev={focus.name === 'developer'}
						class:ux={focus.name === 'designer'}
						class:gfx={focus.name === 'graphic'}
					>
						<header class="card-header">
							<span class="path-code mono">{sData.code}</span>
							<span class="material-symbols-outlined">{sData.icon}</span>
						</header>

						<div class="card-body">
							<h3 class="path-title">{focus.title}</h3>
							<p class="path-summary">{focus.summary.slice(0, 100)}...</p>
						</div>

						<footer class="card-footer mono">
							<span>EXECUTE_TRANSITION</span>
							<span class="material-symbols-outlined">north_east</span>
						</footer>

						<!-- Background path icon -->
						<div class="path-glyph">
							{#if focus.name === 'developer'}{'</>'}{:else if focus.name === 'designer'}{'[_]'}{:else}{'(*)'}{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- ══ CONNECTIVE NODES: Linear Modules ══ -->
		<section class="nodes-section">
			<div class="shared-boundary nodes-grid">
				<div class="node-box contact-module">
					<h3 class="mono node-title">CONTACT_CHANNELS</h3>
					<div class="link-stack">
						<a href="mailto:{personal.email}" class="node-link">
							<span class="mono">E-MAIL_PROTOCOL</span>
							<span class="material-symbols-outlined">mail</span>
						</a>
						<a href={personal.linkedin} target="_blank" class="node-link">
							<span class="mono">LINKEDIN_BRIDGE</span>
							<span class="material-symbols-outlined">open_in_new</span>
						</a>
					</div>
				</div>

				<div class="node-box education-module">
					<h3 class="mono node-title">ACADEMIC_RECORD_SAMPLE</h3>
					<div class="edu-bits">
						{#each education.slice(0, 2) as edu}
							<div class="edu-bit">
								<span class="year mono">{edu.year}</span>
								<span class="info">{edu.degree} // {edu.institution}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.lobby-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}
	@media (min-width: 768px) {
		.lobby-container {
			gap: var(--space-20);
		}
	}

	/* ── HERO ── */
	.header-terminal {
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.terminal-top-bar {
		background: var(--color-surface-container);
		padding: var(--space-2) var(--space-4);
		font-size: 0.75rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--color-outline-variant);
		opacity: 0.7;
	}

	.status-light {
		width: 8px;
		height: 8px;
		background: var(--color-primary);
		border-radius: 50%;
		box-shadow: 0 0 8px var(--color-primary);
		animation: blink 2s infinite;
	}

	.main-spec {
		padding: var(--space-10) var(--space-4);
	}
	@media (min-width: 768px) {
		.main-spec {
			padding: var(--space-20) var(--space-8);
		}
	}

	.hero-label {
		font-size: 0.625rem;
		opacity: 0.4;
		letter-spacing: 0.2em;
		margin-bottom: var(--space-6);
	}

	.hero-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-8);
	}

	.stroke-text {
		font-family: var(--font-display);
		font-size: clamp(3rem, 12vw, 8rem);
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1px var(--color-primary);
		opacity: 0.3;
	}
	.solid-text {
		font-family: var(--font-display);
		font-size: clamp(3rem, 12vw, 8rem);
		line-height: 1;
		color: var(--color-primary);
		letter-spacing: 0.05em;
	}

	.hero-divider {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-size: 0.75rem;
		opacity: 0.6;
		margin: 0 auto var(--space-8) auto;
		max-width: 400px;
	}
	.hero-divider .line {
		flex: 1;
		height: 1px;
		background: var(--color-primary);
		opacity: 0.3;
	}

	.hero-intro-box {
		display: flex;
		justify-content: center;
		gap: var(--space-3);
		max-width: 60ch;
		margin: 0 auto;
	}
	.summary-cursor {
		width: 8px;
		height: 1.2em;
		background: var(--color-primary);
		margin-top: 4px;
		animation: blink 1s infinite;
	}
	.hero-intro {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.6;
		opacity: 0.9;
		text-align: left;
		letter-spacing: -0.02em;
	}

	/* ── PATHS GRID (Shared Boundary) ── */
	.paths-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	.section-tag {
		font-size: 0.625rem;
		opacity: 0.4;
		border-left: 3px solid var(--color-primary);
		padding-left: var(--space-2);
	}

	.paths-grid {
		grid-template-columns: 1fr;
		border-top: 1px solid var(--color-outline-variant);
		border-left: 1px solid var(--color-outline-variant);
		gap: 0;
	}
	@media (min-width: 1024px) {
		.paths-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.path-card {
		display: flex;
		flex-direction: column;
		padding: var(--space-6);
		background: var(--color-surface);
		border-right: 1px solid var(--color-outline-variant);
		border-bottom: 1px solid var(--color-outline-variant);
		text-decoration: none;
		color: inherit;
		position: relative;
		overflow: hidden;
		transition: none; /* Anti-Reflow: Instant or GPU only */
	}

	.path-card:hover {
		z-index: 2;
		background: var(--color-surface-container-lowest);
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}
	.path-card:hover::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.path-card.dev:hover {
		box-shadow:
			inset 0 2px 0 0 #ec4899,
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}
	.path-card.ux:hover {
		box-shadow:
			inset 0 2px 0 0 var(--color-primary),
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}
	.path-card.gfx:hover {
		box-shadow:
			inset 0 2px 0 0 #3b82f6,
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.path-code {
		font-size: 0.625rem;
		opacity: 0.4;
	}

	.path-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		text-transform: uppercase;
		line-height: 1.1;
	}
	@media (min-width: 768px) {
		.path-title {
			font-size: 1.5rem;
		}
	}

	.path-summary {
		font-size: 0.8125rem;
		opacity: 0.6;
		line-height: 1.5;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.5rem;
		color: var(--color-primary);
		font-weight: 700;
		border-top: 1px solid var(--color-outline-variant);
		padding-top: var(--space-3);
		margin-top: auto;
	}

	.path-glyph {
		position: absolute;
		bottom: -10px;
		right: -5px;
		font-family: var(--font-mono);
		font-size: 6rem;
		font-weight: 900;
		opacity: 0.02;
		pointer-events: none;
	}

	/* ── NODES GRID ── */
	.nodes-grid {
		grid-template-columns: 1fr;
		border-top: 1px solid var(--color-outline-variant);
		border-left: 1px solid var(--color-outline-variant);
		gap: 0;
	}
	@media (min-width: 768px) {
		.nodes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.node-box {
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		border-right: 1px solid var(--color-outline-variant);
		border-bottom: 1px solid var(--color-outline-variant);
		position: relative;
		background: var(--color-surface);
	}

	.node-title {
		font-size: 0.625rem;
		opacity: 0.4;
	}

	.link-stack {
		display: flex;
		flex-direction: column;
		gap: 1px;
		background: var(--color-outline-variant);
		border: 1px solid var(--color-outline-variant);
	}
	.node-link {
		background: var(--color-surface);
		padding: var(--space-3) var(--space-4);
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-decoration: none;
		color: inherit;
		transition: background 0.2s;
	}
	.node-link:hover {
		background: var(--color-surface-container-low);
		color: var(--color-primary);
	}
	.node-link span:first-child {
		font-size: 0.6875rem;
		font-weight: 700;
	}

	.edu-bits {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
	.edu-bit {
		display: flex;
		flex-direction: column;
	}
	.edu-bit .year {
		font-size: 0.6875rem;
		color: var(--color-primary);
		font-weight: 700;
	}
	.edu-bit .info {
		font-size: 0.8125rem;
		opacity: 0.8;
	}
</style>
