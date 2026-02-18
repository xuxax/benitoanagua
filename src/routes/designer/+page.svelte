<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = $derived(loadCVData());
	const site = $derived(loadSiteData());
	const focus = $derived(getFocusByName('designer'));
	const profileSite = $derived(site.nav.profiles.find((p) => p.href.includes('designer')));

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
	<div class="cv-container designer-portal">
		<!-- ══ HEADER: CAD Blueprint Spec ══ -->
		<header class="blueprint-header" id="perfil">
			<div class="blueprint-canvas">
				<div class="joint joint--tl"></div>
				<div class="joint joint--tr"></div>
				<div class="joint joint--bl"></div>
				<div class="joint joint--br"></div>

				<div class="canvas-header">
					<span class="mono opacity-40">DOC_REF::ARCH_MOD_UX_02</span>
					<div class="dim-ruler">
						<div class="ruler-line"></div>
						<span class="mono">1024_UNIT</span>
						<div class="ruler-line"></div>
					</div>
				</div>

				<h1 class="monumental-title">
					<span class="stroke-text">{focus?.title.split(' ')[0]}</span>
					<span class="solid-text">{focus?.title.split(' ').slice(1).join(' ')}</span>
				</h1>

				<div class="blueprint-summary">
					<p>{focus?.summary}</p>
					<div class="anchor-point"></div>
				</div>

				<div class="canvas-footer">
					<div class="spec-matrix shared-boundary">
						<div class="spec-cell">
							<span class="mono label">LAT:</span>
							<span class="val">-21.53</span>
						</div>
						<div class="spec-cell">
							<span class="mono label">LNG:</span>
							<span class="val">-64.72</span>
						</div>
						<div class="spec-cell">
							<span class="mono label">SCALE:</span>
							<span class="val">1:18_YRS</span>
						</div>
					</div>
				</div>
			</div>

			<aside class="sidebar-info">
				<div class="info-card shared-boundary">
					<div class="info-item">
						<h3 class="mono">CONTACT_PROT</h3>
						<div class="link-group">
							<a href="mailto:{cvData.personal.email}" class="mono link">E-MAIL_TX</a>
							<a href={cvData.personal.website} target="_blank" class="mono link">WWW_ENTRY</a>
						</div>
					</div>
					<div class="info-item">
						<h3 class="mono">SOCIAL_SIGNALS</h3>
						<div class="link-group">
							<a href={cvData.personal.behance} target="_blank" class="mono link">BEHANCE_REPO</a>
							<a href={cvData.personal.linkedin} target="_blank" class="mono link">LINKEDIN_ID</a>
						</div>
					</div>
				</div>
			</aside>
		</header>

		<!-- ══ SKILLS: Modular Grid ══ -->
		<section class="section-blueprint" id="habilidades">
			<header class="section-header-blueprint">
				<h2 class="mono">01_MODULAR_STACK_SPEC</h2>
				<div class="line"></div>
			</header>

			<div class="shared-boundary skills-grid">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="skill-module">
							<div class="module-id mono">
								NODE__{skillGroup.category.slice(0, 3).toUpperCase()}
							</div>
							<h3 class="module-title">{skillGroup.category}</h3>
							<ul class="module-list">
								{#each skillGroup.items as item}
									<li class="item">
										<span class="node"></span>
										<span class="text">{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- ══ EXPERIENCE: Linear Projection ══ -->
		<section class="section-blueprint" id="experiencia">
			<header class="section-header-blueprint">
				<h2 class="mono">02_TRAJECTORY_PROJECTION</h2>
				<div class="line"></div>
			</header>

			<div class="projection-timeline">
				{#each focus?.experiences || [] as exp, index}
					<article class="projection-point" class:active={index === 0}>
						<div class="point-side">
							<div class="point-marker"></div>
							<span class="mono year">{extractYear(exp.period)}</span>
						</div>
						<div class="point-content">
							<h3 class="company-title">{exp.company}</h3>
							<span class="role-tag mono">{exp.position.toUpperCase()}</span>
							<p class="desc">{exp.description}</p>
						</div>
					</article>
				{/each}
				<div class="axis-line"></div>
			</div>
		</section>

		<!-- ══ EDUCATION: Certified Nodes ══ -->
		<section class="section-blueprint" id="educacion">
			<header class="section-header-blueprint">
				<h2 class="mono">03_CERTIFIED_NODES</h2>
				<div class="line"></div>
			</header>

			<div class="nodes-grid">
				{#each cvData.education as entry}
					<div class="node-card">
						<div class="corner-l"></div>
						<div class="node-meta">
							<span class="mono year">[{entry.year}]</span>
							<div class="node-line"></div>
						</div>
						<h4 class="node-degree">{entry.degree.toUpperCase()}</h4>
						<p class="node-inst mono">{entry.institution.toUpperCase()}</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.designer-portal {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}
	@media (min-width: 768px) {
		.designer-portal {
			gap: var(--space-20);
		}
	}

	/* ── JOINTS ── */
	.joint {
		position: absolute;
		width: 16px;
		height: 16px;
		z-index: 2;
	}
	@media (min-width: 768px) {
		.joint {
			width: 24px;
			height: 24px;
		}
	}

	.joint::before,
	.joint::after {
		content: '';
		position: absolute;
		background: var(--color-on-surface);
		opacity: 0.6;
	}
	.joint--tl {
		top: -1px;
		left: -1px;
	}
	.joint--tl::before {
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
	}
	.joint--tl::after {
		top: 0;
		left: 0;
		width: 1px;
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
		height: 1px;
	}
	.joint--tr::after {
		top: 0;
		right: 0;
		width: 1px;
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
		height: 1px;
	}
	.joint--bl::after {
		bottom: 0;
		left: 0;
		width: 1px;
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
		height: 1px;
	}
	.joint--br::after {
		bottom: 0;
		right: 0;
		width: 2px;
		height: 100%;
	}

	/* ── HEADER ── */
	.blueprint-header {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}
	@media (min-width: 1024px) {
		.blueprint-header {
			grid-template-columns: 2fr 1fr;
			gap: var(--space-8);
		}
	}

	.blueprint-canvas {
		position: relative;
		padding: var(--space-10) var(--space-4);
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
	}
	@media (min-width: 768px) {
		.blueprint-canvas {
			padding: var(--space-12) var(--space-8);
		}
	}

	.canvas-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-8);
	}
	.dim-ruler {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex: 1;
		margin-left: var(--space-4);
		opacity: 0.3;
	}
	@media (max-width: 640px) {
		.dim-ruler {
			display: none;
		}
	}

	.ruler-line {
		flex: 1;
		height: 1px;
		background: var(--color-on-surface);
		position: relative;
	}
	.ruler-line::before,
	.ruler-line::after {
		content: '';
		position: absolute;
		height: 8px;
		width: 1px;
		background: var(--color-on-surface);
		top: -4px;
	}

	.monumental-title {
		display: flex;
		flex-direction: column;
		line-height: 0.85;
		margin-bottom: var(--space-8);
	}
	.stroke-text {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 10vw, 7rem);
		color: transparent;
		-webkit-text-stroke: 1px var(--color-on-surface);
	}
	.solid-text {
		font-family: var(--font-display);
		font-size: clamp(2rem, 8vw, 5.5rem);
		color: var(--color-primary);
	}

	.blueprint-summary {
		position: relative;
		padding: var(--space-4);
		border: 1px solid var(--color-outline-variant);
		max-width: 60ch;
	}
	@media (min-width: 768px) {
		.blueprint-summary {
			padding: var(--space-8);
		}
	}

	.blueprint-summary p {
		font-size: 1rem;
		line-height: 1.6;
		opacity: 0.8;
	}
	@media (min-width: 768px) {
		.blueprint-summary p {
			font-size: 1.125rem;
		}
	}

	.anchor-point {
		position: absolute;
		top: -5px;
		left: -5px;
		width: 10px;
		height: 10px;
		border: 1px solid var(--color-primary);
		background: var(--color-background);
	}

	.canvas-footer {
		margin-top: var(--space-8);
	}
	@media (min-width: 768px) {
		.canvas-footer {
			margin-top: var(--space-12);
		}
	}

	.spec-matrix {
		grid-template-columns: repeat(3, 1fr);
		border: 1px solid var(--color-outline-variant);
	}
	.spec-cell {
		padding: var(--space-3);
		display: flex;
		flex-direction: column;
	}
	@media (min-width: 768px) {
		.spec-cell {
			padding: var(--space-4);
		}
	}

	.spec-cell .label {
		font-size: 0.5rem;
		opacity: 0.4;
		color: var(--color-primary);
	}
	.spec-cell .val {
		font-weight: 700;
		font-size: 0.75rem;
	}

	.sidebar-info {
		display: flex;
		flex-direction: column;
	}
	.info-card {
		grid-template-columns: 1fr;
		height: 100%;
		border: 1px solid var(--color-outline-variant);
	}
	@media (max-width: 1024px) {
		.info-card {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 640px) {
		.info-card {
			grid-template-columns: 1fr;
		}
	}

	.info-item {
		padding: var(--space-6);
		border-bottom: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.info-item {
			padding: var(--space-8);
		}
	}

	.info-item:last-child {
		border-bottom: none;
	}
	.info-item h3 {
		font-size: 0.625rem;
		opacity: 0.4;
		margin-bottom: var(--space-4);
	}
	.link-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.link-group a {
		font-size: 0.6875rem;
		text-decoration: none;
		color: var(--color-on-surface);
		transition: color 0.2s;
		font-weight: 700;
	}
	.link-group a:hover {
		color: var(--color-primary);
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

	.section-header-blueprint {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}
	.section-header-blueprint h2 {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-on-surface);
	}
	.section-header-blueprint .line {
		flex: 1;
		height: 1px;
		background: var(--color-outline-variant);
	}

	/* ── MODULES ── */
	.skills-grid {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 640px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.skills-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.skill-module {
		padding: var(--space-6);
		transition: box-shadow var(--duration-fast);
		position: relative;
	}
	@media (min-width: 768px) {
		.skill-module {
			padding: var(--space-8);
		}
	}

	.skill-module:hover {
		z-index: 5;
		box-shadow: var(--ring-primary);
		background: var(--color-surface-container-lowest);
	}
	.module-id {
		font-size: 0.5rem;
		opacity: 0.3;
		margin-bottom: var(--space-4);
		background: var(--color-primary-container);
		width: fit-content;
		padding: 2px 6px;
	}
	.module-title {
		font-family: var(--font-display);
		font-size: 1.125rem;
		text-transform: uppercase;
		margin-bottom: var(--space-4);
	}
	.module-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: 0.75rem;
	}
	.node {
		width: 6px;
		height: 6px;
		border: 1.5px solid var(--color-primary);
	}

	/* ── PROJECTION ── */
	.projection-timeline {
		position: relative;
		padding-left: var(--space-10);
	}
	@media (min-width: 768px) {
		.projection-timeline {
			padding-left: var(--space-16);
		}
	}

	.axis-line {
		position: absolute;
		left: 8px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.axis-line {
			left: 10px;
		}
	}

	.projection-point {
		position: relative;
		padding-bottom: var(--space-10);
		display: flex;
		gap: var(--space-6);
	}
	@media (min-width: 768px) {
		.projection-point {
			padding-bottom: var(--space-16);
			gap: var(--space-12);
		}
	}

	.point-side {
		position: absolute;
		left: -42px;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	@media (min-width: 768px) {
		.point-side {
			left: -54px;
		}
	}

	.point-marker {
		width: 15px;
		height: 15px;
		border: 1px solid var(--color-on-surface);
		background: var(--color-background);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 2;
	}
	@media (min-width: 768px) {
		.point-marker {
			width: 21px;
			height: 21px;
		}
	}

	.active .point-marker {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 4px var(--color-primary-container);
	}
	.active .point-marker::after {
		content: '';
		width: 7px;
		height: 7px;
		background: var(--color-primary);
		border-radius: 50%;
	}
	@media (min-width: 768px) {
		.active .point-marker::after {
			width: 9px;
			height: 9px;
		}
	}

	.point-side .year {
		font-size: 0.625rem;
		font-weight: 700;
		margin-top: var(--space-1);
		opacity: 0.5;
	}
	.active .year {
		opacity: 1;
		color: var(--color-primary);
	}

	.company-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		text-transform: uppercase;
		line-height: 1.1;
		margin-bottom: 2px;
	}
	@media (min-width: 768px) {
		.company-title {
			font-size: 1.75rem;
		}
	}

	.role-tag {
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 700;
		opacity: 0.8;
	}
	.desc {
		margin-top: var(--space-3);
		font-size: 0.875rem;
		line-height: 1.6;
		opacity: 0.7;
		max-width: 65ch;
	}

	/* ── NODES ── */
	.nodes-grid {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 640px) {
		.nodes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.node-card {
		padding: var(--space-6);
		position: relative;
		border-bottom: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.node-card {
			padding: var(--space-8);
		}
	}

	@media (min-width: 640px) {
		.node-card:nth-child(odd) {
			border-right: 1px solid var(--color-outline-variant);
		}
	}

	.corner-l {
		position: absolute;
		left: -1px;
		top: var(--space-6);
		width: 8px;
		height: 1px;
		background: var(--color-primary);
	}
	.node-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}
	.node-meta .year {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-primary);
	}
	.node-line {
		flex: 1;
		height: 1px;
		background: var(--color-outline-variant);
		border-bottom: 1px dashed var(--color-outline-variant);
	}
	.node-degree {
		font-family: var(--font-display);
		font-size: 0.875rem;
		margin-bottom: 2px;
	}
	.node-inst {
		font-size: 0.5625rem;
		opacity: 0.5;
	}
</style>
