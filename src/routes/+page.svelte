<script lang="ts">
	import { getAllFocuses, getPersonalInfo, getEducation } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
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
</svelte:head>

<PortalLayout {navItems}>
	<div class="lobby-container">
		<!-- ══ LOBBY HERO: Structural Narrative ══ -->
		<section class="lobby-hero">
			<div class="blueprint-frame">
				<div class="joint joint--tl"></div>
				<div class="joint joint--tr"></div>
				<div class="joint joint--bl"></div>
				<div class="joint joint--br"></div>

				<div class="hero-label mono">SYS_AUTH_PORTAL_V2</div>

				<h1 class="hero-title">
					<span class="stroke-text">{personal.name.split(' ')[0]}</span>
					<span class="solid-text">{personal.name.split(' ')[1] || ''}</span>
				</h1>

				<div class="hero-divider">
					<div class="line"></div>
					<span class="mono">{site.meta.tagline.toUpperCase()}</span>
					<div class="line"></div>
				</div>

				<p class="hero-intro">{site.meta.description}</p>
			</div>
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

	/* ── JOINTS (Structural CAD Detail) ── */
	.joint {
		position: absolute;
		width: 16px;
		height: 16px;
		z-index: 2;
	}
	.joint::before,
	.joint::after {
		content: '';
		position: absolute;
		background: var(--color-on-surface);
	}
	.joint--tl {
		top: -1px;
		left: -1px;
	}
	.joint--tl::before {
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
	}
	.joint--tl::after {
		top: 0;
		left: 0;
		width: 2px;
		height: 100%;
	}

	.joint--tr {
		top: -1px;
		right: -1px;
	}
	.joint--tr::before {
		top: 0;
		right: 0;
		width: 100%;
		height: 2px;
	}
	.joint--tr::after {
		top: 0;
		right: 0;
		width: 2px;
		height: 100%;
	}

	.joint--bl {
		bottom: -1px;
		left: -1px;
	}
	.joint--bl::before {
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
	}
	.joint--bl::after {
		bottom: 0;
		left: 0;
		width: 2px;
		height: 100%;
	}

	.joint--br {
		bottom: -1px;
		right: -1px;
	}
	.joint--br::before {
		bottom: 0;
		right: 0;
		width: 100%;
		height: 2px;
	}
	.joint--br::after {
		bottom: 0;
		right: 0;
		width: 2px;
		height: 100%;
	}

	/* ── HERO ── */
	.blueprint-frame {
		position: relative;
		padding: var(--space-10) var(--space-4);
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
		text-align: center;
	}
	@media (min-width: 768px) {
		.blueprint-frame {
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
		line-height: 0.85;
		margin-bottom: var(--space-6);
	}

	.stroke-text {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 10vw, 8rem);
		color: transparent;
		-webkit-text-stroke: 1px var(--color-on-surface);
		opacity: 0.4;
	}

	.solid-text {
		font-family: var(--font-display);
		font-size: clamp(2rem, 8vw, 7rem);
	}

	.hero-divider {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}
	.hero-divider .line {
		flex: 1;
		height: 1px;
		background: var(--color-outline-variant);
	}
	.hero-divider span {
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 700;
	}

	.hero-intro {
		max-width: 50ch;
		margin: 0 auto;
		line-height: 1.6;
		opacity: 0.7;
		font-size: var(--text-base);
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
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 1024px) {
		.paths-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.path-card {
		padding: var(--space-8) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		text-decoration: none;
		color: inherit;
		position: relative;
		overflow: hidden;
		transition: transform var(--duration-fast) var(--ease-linear);
	}
	@media (min-width: 768px) {
		.path-card {
			padding: var(--space-12) var(--space-8);
			gap: var(--space-8);
		}
	}

	.path-card:hover {
		transform: translateY(-4px);
		z-index: 10;
	}
	.path-card:hover::after {
		content: '';
		position: absolute;
		inset: 0;
		box-shadow: var(--ring-primary);
		pointer-events: none;
	}

	.path-card.dev:hover {
		border-top: 4px solid #ec4899;
	}
	.path-card.ux:hover {
		border-top: 4px solid var(--color-primary);
	}
	.path-card.gfx:hover {
		border-top: 4px solid #3b82f6;
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
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.nodes-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.node-box {
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	@media (min-width: 768px) {
		.node-box {
			padding: var(--space-8);
		}
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
