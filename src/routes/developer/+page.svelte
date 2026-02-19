<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

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

	function extractYear(period: string) {
		const start = period.split('-')[0].trim();
		const year = start.split(' ').pop();
		return year;
	}
</script>

<svelte:head>
	<title>{focus?.title} — {cvData.personal.name}</title>
</svelte:head>

<PortalLayout {navItems} showBackButton={true}>
	<div class="cv-container developer-portal">
		<!-- ══ HEADER: Logic Specification ══ -->
		<header class="spec-header" id="perfil">
			<div class="header-blueprint shared-boundary">
				<div class="main-spec">
					<div class="joint joint--tl"></div>
					<div class="joint joint--br"></div>

					<h1 class="hero-title">
						<span class="stroke-text">{focus?.title.split(' ')[0]}</span>
						<span class="solid-text">{focus?.title.split(' ').slice(1).join(' ')}</span>
					</h1>

					<div class="spec-summary">
						<div class="summary-line"></div>
						<p>{focus?.summary}</p>
					</div>
				</div>

				<aside class="meta-spec">
					<div class="spec-box-list shared-boundary">
						<div class="spec-item">
							<span class="mono label">LOCATION</span>
							<span class="val">{cvData.personal.location}</span>
						</div>
						<div class="spec-item">
							<span class="mono label">ENGINEERING_EXP</span>
							<span class="val">{site.nav.exp_label}</span>
						</div>
						<div class="spec-item">
							<span class="mono label">ENGINEERING_EXP</span>
							<span class="val">{site.nav.exp_label}</span>
						</div>
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

			<div class="shared-boundary skills-matrix">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="matrix-cell">
							<div class="cell-header mono">{skillGroup.category.toUpperCase()}</div>
							<ul class="cell-list mono">
								{#each skillGroup.items as item}
									<li><span class="bullet">›</span> {item}</li>
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

			<div class="trajectory-log">
				{#each focus?.experiences || [] as exp, index}
					<article class="log-entry" class:active={index === 0}>
						<div class="log-side mono">
							<span class="year">{extractYear(exp.period)}</span>
							{#if index === 0}<span class="pulse">LIVE</span>{/if}
						</div>
						<div class="log-main">
							<h3 class="log-company">{exp.company}</h3>
							<span class="log-role mono">{exp.position.toUpperCase()}</span>
							<p class="log-desc">{exp.description}</p>
						</div>
						<div class="log-path"></div>
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

	/* ── JOINTS ── */
	.joint {
		position: absolute;
		width: 12px;
		height: 12px;
		z-index: 2;
		border: 1.5px solid var(--color-primary);
	}
	@media (min-width: 768px) {
		.joint {
			width: 16px;
			height: 16px;
		}
	}

	.joint--tl {
		top: -6px;
		left: -6px;
		border-right: none;
		border-bottom: none;
	}
	.joint--br {
		bottom: -6px;
		right: -6px;
		border-left: none;
		border-top: none;
	}

	/* ── HEADER ── */
	.header-blueprint {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 1024px) {
		.header-blueprint {
			grid-template-columns: 2fr 1fr;
		}
	}

	.main-spec {
		position: relative;
		padding: var(--space-8) var(--space-4);
	}
	@media (min-width: 768px) {
		.main-spec {
			padding: var(--space-12) var(--space-8);
		}
	}

	.hero-title {
		display: flex;
		flex-direction: column;
		line-height: 0.8;
		margin-bottom: var(--space-6);
	}
	.stroke-text {
		font-family: var(--font-display);
		font-size: clamp(2rem, 8vw, 6rem);
		color: transparent;
		-webkit-text-stroke: 1px var(--color-on-surface);
		opacity: 0.4;
	}
	.solid-text {
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 6vw, 5rem);
	}

	.spec-summary {
		position: relative;
		padding-left: var(--space-6);
	}
	.summary-line {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--color-primary);
	}
	.spec-summary p {
		font-size: 1rem;
		line-height: 1.6;
		opacity: 0.8;
		max-width: 60ch;
	}

	.meta-spec {
		display: flex;
		flex-direction: column;
	}
	.spec-box-list {
		grid-template-columns: 1fr;
		height: 100%;
	}
	.spec-item {
		padding: var(--space-4) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.spec-item .label {
		font-size: 0.5rem;
		opacity: 0.4;
		color: var(--color-primary);
	}
	.spec-item .val {
		font-weight: 700;
		font-size: 0.75rem;
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
	.skills-matrix {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 640px) {
		.skills-matrix {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.skills-matrix {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.matrix-cell {
		padding: var(--space-6);
		transition: background var(--duration-fast);
	}
	.matrix-cell:hover {
		background: var(--color-surface-container-low);
	}
	.cell-header {
		font-size: 0.625rem;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 4px;
	}
	.cell-list {
		list-style: none;
		font-size: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.bullet {
		color: var(--color-primary);
		font-weight: 700;
	}

	/* ── LOG ── */
	.trajectory-log {
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.log-entry {
		display: grid;
		grid-template-columns: 60px 1fr;
		gap: var(--space-4);
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--color-outline-variant);
		position: relative;
	}
	@media (min-width: 768px) {
		.log-entry {
			grid-template-columns: 100px 1fr;
			gap: var(--space-12);
			padding: var(--space-10) 0;
		}
	}

	.log-side {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-1);
	}
	.log-side .year {
		font-size: 1rem;
		font-weight: 800;
		opacity: 0.2;
	}
	@media (min-width: 768px) {
		.log-side .year {
			font-size: 1.5rem;
		}
	}

	.active .log-side .year {
		opacity: 1;
		color: var(--color-primary);
	}
	.pulse {
		font-size: 0.5rem;
		color: #22c55e;
		border: 1px solid #22c55e;
		padding: 1px 4px;
	}

	.log-role {
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 700;
		display: block;
		margin-bottom: 2px;
	}
	.log-company {
		font-family: var(--font-display);
		font-size: 1.25rem;
		line-height: 1.1;
		margin-bottom: var(--space-1);
	}
	@media (min-width: 768px) {
		.log-company {
			font-size: 1.75rem;
		}
	}

	.log-desc {
		font-size: 0.8125rem;
		opacity: 0.7;
		line-height: 1.5;
		max-width: 65ch;
	}

	.log-path {
		position: absolute;
		left: 68px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.log-path {
			left: 112px;
		}
	}

	.active .log-path {
		background: var(--color-primary);
		border-left: 2px solid var(--color-primary);
		margin-left: -1px;
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
