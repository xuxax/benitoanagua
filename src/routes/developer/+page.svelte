<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import { SITE_URL, ROUTES } from '$lib/config';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	let { data } = $props();

	const cvData = $derived(loadCVData());
	const site = $derived(loadSiteData());
	const focus = $derived(getFocusByName('developer'));
	const profileSite = $derived(site.nav.profiles.find((p) => p.href.includes('developer')));

	const navItems = $derived(
		profileSite
			? [
					{ label: profileSite.sections.perfil, href: '#perfil' },
					{ label: profileSite.sections.habilidades, href: '#habilidades' },
					{ label: profileSite.sections.experiencia, href: '#experiencia' },
					{ label: profileSite.sections.educacion, href: '#educacion' }
				]
			: []
	);
	function splitPeriod(period: string) {
		const parts = period.split('-').map((p) => p.trim());
		return { start: parts[0], end: parts[1] };
	}
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />

	<!-- Schema.org markup for developer page -->
	<script type="application/ld+json">
		{{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "{SITE_URL}"
				}},
				{{
					"@type": "ListItem",
					"position": 2,
					"name": "Developer",
					"item": "{SITE_URL}{ROUTES.developer}"
				}}
			]
		}}
	</script>
</svelte:head>

<PortalLayout {navItems} showBackButton={true}>
	<div class="cv-container developer-portal">
		<!-- ══ HEADER: Logic Specification ══ -->
		<header class="spec-header" id="perfil">
			<div class="header-terminal shared-boundary">
				<div class="terminal-top-bar mono">
					<span>root@BENITO_CV:~# init_sequence --verbose</span>
					<span class="status-light"></span>
				</div>

				<div class="main-spec">
					<h1 class="hero-title">
						<span class="title-label mono">{focus?.title.split(' ')[0]}</span>
						<span class="solid-text">{focus?.title.split(' ').slice(1).join(' ')}</span>
					</h1>

					<div class="spec-summary">
						<div class="summary-cursor"></div>
						<p>{focus?.summary}</p>
					</div>

					{#if focus?.subtitles}
						<div class="focus-tags">
							{#each focus.subtitles as tag}
								<span class="focus-tag mono">
									<span class="brace">[</span>
									{tag.toUpperCase()} <span class="brace">]</span>
								</span>
							{/each}
						</div>
					{/if}
				</div>

				<aside class="meta-footer mono">
					<div class="meta-item">
						<span class="label">User:</span>
						<span class="val">{cvData.personal.name}</span>
					</div>
					<div class="meta-item">
						<span class="label">Loc:</span>
						<span class="val">{cvData.personal.location}</span>
					</div>
					<div class="meta-item">
						<span class="label">Uptime:</span>
						<span class="val">{site.nav.exp_label}</span>
					</div>
					<div class="meta-item">
						<span class="label">Contact:</span>
						<span class="val">{cvData.personal.email}</span>
					</div>
					<div class="meta-item mobile-hide">
						<span class="label">Shell:</span>
						<span class="val">zsh</span>
					</div>
				</aside>
			</div>
		</header>

		<!-- ══ SKILLS: Computational Matrix ══ -->
		<section class="section-blueprint" id="habilidades">
			<div class="section-heading mono">
				<span class="index">01_</span> RESOURCE_STACK_MATRIX
				<div class="heading-line"></div>
			</div>

			<div class="shared-boundary skills-terminal">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="terminal-block">
							<div class="block-header mono">
								<span class="prompt">//</span>
								{skillGroup.category.toUpperCase()}
							</div>
							<ul class="block-list mono">
								{#each skillGroup.items as item}
									<li>
										<span class="status">[ OK ]</span>
										<span class="cmd">{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- ══ EXPERIENCE: Linear Log ══ -->
		<section class="section-blueprint" id="experiencia">
			<div class="section-heading mono">
				<span class="index">02_</span> TRAJECTORY_EXECUTION_LOG
				<div class="heading-line"></div>
			</div>

			<div class="git-history">
				{#each focus?.experiences || [] as exp, index}
					<article class="commit-entry" class:current={index === 0}>
						<div class="commit-meta mono">
							<span class="hash">7f{index}a{9 - index}c</span>
							<div class="date-stack">
								<span class="date">{splitPeriod(exp.period).start}</span>
								<span class="sep">↓</span>
								<span class="date">{splitPeriod(exp.period).end || 'PRESENT'}</span>
							</div>
						</div>
						<div class="commit-node">
							<div class="dot"></div>
							<div class="line"></div>
						</div>
						<div class="commit-body">
							<div class="header">
								<h3 class="company mono">{exp.company.toUpperCase()}</h3>
								{#if index === 0}
									<span class="tag mono">HEAD -> MAIN</span>
								{:else}
									<span class="tag tag--merged mono">MERGED</span>
								{/if}
							</div>
							<div class="sub-header mono">{exp.position}</div>
							<p class="message">{exp.description}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ══ EDUCATION: Static Proofs ══ -->
		<section class="section-blueprint" id="educacion">
			<div class="section-heading mono">
				<span class="index">03_</span> ACADEMIC_CERT_CONSTANTS
				<div class="heading-line"></div>
			</div>

			<div class="shared-boundary edu-grid">
				{#each cvData.education as entry}
					<div class="edu-card">
						<span class="edu-year mono">[{entry.year}]</span>
						<h4 class="edu-degree">{entry.degree.toUpperCase()}</h4>
						<p class="edu-inst mono">SOURCE::{entry.institution.toUpperCase()}</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.developer-portal {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}
	@media (min-width: 768px) {
		.developer-portal {
			gap: var(--space-20);
		}
	}

	/* ── HEADER ── */
	.header-terminal {
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
		position: relative;
		overflow: hidden;
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

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	.main-spec {
		padding: var(--space-8) var(--space-4);
	}
	@media (min-width: 768px) {
		.main-spec {
			padding: var(--space-12) var(--space-10);
		}
	}

	.hero-title {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space-8);
		gap: var(--space-2);
	}
	.title-label {
		font-size: 0.875rem;
		color: var(--color-primary);
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	.solid-text {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 4rem);
		line-height: 1;
	}

	.spec-summary {
		max-width: 65ch;
		margin-bottom: var(--space-8);
		display: flex;
		gap: var(--space-4);
	}
	.summary-cursor {
		width: 10px;
		height: 1.25em;
		background: var(--color-primary);
		margin-top: 4px;
		flex-shrink: 0;
	}

	.spec-summary p {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.7;
		opacity: 0.9;
	}
	@media (min-width: 768px) {
		.spec-summary p {
			font-size: 1rem;
		}
	}

	.focus-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}
	.focus-tag {
		background: var(--color-surface-container-low);
		padding: 4px 8px;
		font-size: 0.75rem;
		color: var(--color-primary);
	}
	.focus-tag .brace {
		color: var(--color-on-surface);
		opacity: 0.5;
	}

	.meta-footer {
		display: grid;
		grid-template-columns: 1fr;
		border-top: 1px solid var(--color-outline-variant);
		background: var(--color-surface-container-lowest);
	}
	@media (min-width: 768px) {
		.meta-footer {
			grid-template-columns: repeat(5, auto);
		}
	}

	.meta-item {
		padding: var(--space-3) var(--space-6);
		font-size: 0.75rem;
		display: flex;
		gap: var(--space-2);
		border-bottom: 1px solid var(--color-outline-variant);
	}
	.meta-item .label {
		color: var(--color-primary);
		opacity: 0.7;
	}
	@media (min-width: 768px) {
		.meta-item {
			border-bottom: none;
			border-right: 1px solid var(--color-outline-variant);
		}
		.meta-item:last-child {
			border-right: none;
		}
	}
	.mobile-hide {
		display: none;
	}
	@media (min-width: 768px) {
		.mobile-hide {
			display: flex;
		}
	}

	/* ── SECTIONS ── */
	.section-blueprint {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
	@media (min-width: 768px) {
		.section-blueprint {
			gap: var(--space-10);
		}
	}

	.section-heading {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-primary);
	}
	.index {
		opacity: 0.4;
	}
	.heading-line {
		flex: 1;
		height: 1px;
		background: var(--color-outline-variant);
	}

	/* ── MATRIX ── */

	/* ── TERMINAL MATRIX ── */
	.skills-terminal {
		grid-template-columns: 1fr;
		background: var(--color-surface-container-lowest);
		background-image:
			linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
			linear-gradient(90px, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
		background-size: 100% 20px;
		border: 1px solid var(--color-on-surface);
		padding: var(--space-2);
		position: relative;
		overflow: hidden;
	}
	.skills-terminal::after {
		content: '0101010101101010101010101101010101010101101010101010101101010101010101101010101010101101010101010';
		position: absolute;
		bottom: 2px;
		right: 2px;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--color-primary);
		opacity: 0.05;
		white-space: nowrap;
		pointer-events: none;
	}
	@media (min-width: 768px) {
		.skills-terminal {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.terminal-block {
		padding: var(--space-6);
		border: 1px solid transparent;
	}
	.terminal-block:hover {
		border-color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.block-header {
		font-size: 0.625rem;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
		font-weight: 700;
	}
	.block-header .prompt {
		opacity: 0.4;
	}

	.block-list {
		list-style: none;
		font-size: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.block-list li {
		display: flex;
		gap: var(--space-3);
		align-items: center;
	}
	.block-list .status {
		color: #22c55e;
		font-size: 0.625rem;
		font-weight: 700;
	}
	.block-list .cmd {
		opacity: 0.8;
	}

	/* ── GIT DYNAMICS ── */
	.git-history {
		display: flex;
		flex-direction: column;
		background: var(--color-surface-container-lowest);
		border-left: 2px solid var(--color-on-surface);
		padding: var(--space-8) 0;
	}

	.commit-entry {
		display: grid;
		grid-template-columns: 80px 40px 1fr;
		padding: var(--space-4) var(--space-6);
		position: relative;
	}

	@media (min-width: 768px) {
		.commit-entry {
			grid-template-columns: 120px 60px 1fr;
			padding: var(--space-6) var(--space-10);
		}
	}

	.commit-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 6px;
	}
	.commit-meta .hash {
		font-size: 0.5625rem;
		color: var(--color-primary);
		opacity: 0.4;
	}
	.date-stack {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		line-height: 1;
		gap: 2px;
	}
	.date-stack .date {
		font-size: 0.6875rem;
		font-weight: 800;
		white-space: nowrap;
	}
	.date-stack .sep {
		font-size: 10px;
		opacity: 0.3;
		margin-right: 4px;
	}

	.commit-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	.commit-node .dot {
		width: 12px;
		height: 12px;
		border: 2px solid var(--color-on-surface);
		background: var(--color-surface);
		border-radius: 50%;
		z-index: 2;
		margin-top: 4px;
	}
	.current .commit-node .dot {
		background: var(--color-primary);
		border-color: var(--color-primary);
		box-shadow: 0 0 0 4px var(--color-primary-container);
	}
	.commit-node .line {
		flex: 1;
		width: 2px;
		background: var(--color-outline-variant);
		margin: 4px 0 -24px 0;
	}
	.commit-entry:last-child .commit-node .line {
		display: none;
	}

	.commit-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.commit-body .header {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
	}
	.commit-body .company {
		font-size: 1.125rem;
		font-weight: 800;
	}
	.commit-body .tag {
		font-size: 0.5625rem;
		padding: 2px 6px;
		background: #22c55e;
		color: white;
		border-radius: 2px;
	}
	.commit-body .tag--merged {
		background: var(--color-outline);
		opacity: 0.6;
	}

	.commit-body .sub-header {
		font-size: 0.75rem;
		color: var(--color-primary);
		font-weight: 700;
	}
	.commit-body .message {
		font-size: 0.8125rem;
		opacity: 0.7;
		line-height: 1.5;
		max-width: 65ch;
	}

	/* ── EDU ── */
	.edu-grid {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 640px) {
		.edu-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.edu-card {
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		transition: transform var(--duration-fast);
	}
	.edu-card:hover {
		transform: scale(0.99);
		background: var(--color-surface-container-lowest);
	}
	.edu-year {
		font-size: 1rem;
		font-weight: 900;
		color: var(--color-primary);
	}
	.edu-degree {
		font-size: 0.75rem;
		font-weight: 800;
		border-bottom: 2px solid var(--color-on-surface);
		padding-bottom: 2px;
	}
	.edu-inst {
		font-size: 0.5625rem;
		opacity: 0.5;
	}
</style>
