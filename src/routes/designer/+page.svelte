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

				<div class="canvas-header-meta">
					<div class="sheet-info">
						<span class="mono">// SHEET_A-101</span>
						<span class="mono">// VERSION_2.4.0</span>
					</div>
					<div class="drafting-scale mono">SCALE: 1:18_YRS</div>
				</div>

				<div class="main-canvas-area">
					<h1 class="monumental-title">
						<span class="title-label mono">{focus?.title.split(' ')[0]}</span>
						<span class="solid-text">{focus?.title.split(' ').slice(1).join(' ')}</span>
					</h1>

					<div class="blueprint-summary">
						<div class="dim-line dim-line--t"></div>
						<div class="dim-line dim-line--l"></div>
						<p>{focus?.summary}</p>
						<div class="anchor-point"></div>
					</div>

					{#if focus?.subtitles}
						<div class="focus-tags">
							{#each focus.subtitles as tag}
								<span class="focus-tag mono">{tag}</span>
							{/each}
						</div>
					{/if}
				</div>

				<div class="canvas-footer">
					<div class="spec-matrix shared-boundary">
						<div class="spec-cell">
							<span class="mono label">LOC:</span>
							<span class="val">{cvData.personal.location.toUpperCase()}</span>
						</div>
						<div class="spec-cell">
							<span class="mono label">EXP:</span>
							<span class="val">{site.nav.exp_label}</span>
						</div>
						<div class="spec-cell">
							<span class="mono label">COMMS:</span>
							<span class="val">{cvData.personal.email.toUpperCase()}</span>
						</div>
						<div class="spec-cell meta-only">
							<span class="mono label">COORD:</span>
							<span class="val">-21.53 / -64.72</span>
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- ══ SKILLS: Modular Grid ══ -->
		<section class="section-blueprint" id="habilidades">
			<header class="section-header-blueprint">
				<h2 class="mono">01_MODULAR_STACK_SPEC</h2>
				<div class="line"></div>
			</header>

			<div class="shared-boundary skills-blueprint">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="blueprint-module">
							<div class="module-marker tl"></div>
							<div class="module-marker tr"></div>
							<div class="module-marker bl"></div>
							<div class="module-marker br"></div>
							<div class="module-label mono">{skillGroup.category}</div>
							<ul class="module-nodes">
								{#each skillGroup.items as item}
									<li class="node-item">
										<span class="dot"></span>
										<span class="label">{item}</span>
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

			<div class="roadmap-grid">
				{#each focus?.experiences || [] as exp, index}
					<article class="milestone-card" class:stagger={index % 2 !== 0}>
						<div class="milestone-meta mono">
							<span class="marker">●</span>
							<span class="period">{exp.period}</span>
						</div>
						<div class="milestone-content">
							<h3 class="title">{exp.company}</h3>
							<div class="role mono">{exp.position.toUpperCase()}</div>
							<p class="body">{exp.description}</p>
						</div>
						<div class="milestone-edge"></div>
					</article>
				{/each}
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
			gap: var(--space-8);
		}
	}

	.blueprint-canvas {
		position: relative;
		padding: var(--space-8) var(--space-4);
		border: 1px solid var(--color-on-surface);
		background: var(--color-surface);
		background-image: radial-gradient(var(--color-outline-variant) 1px, transparent 1px);
		background-size: 30px 30px;
	}
	@media (min-width: 768px) {
		.blueprint-canvas {
			padding: var(--space-12) var(--space-10);
		}
	}

	.canvas-header-meta {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-12);
		font-size: 0.625rem;
		opacity: 0.4;
	}
	.sheet-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.monumental-title {
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
		color: var(--color-primary);
	}

	.main-canvas-area {
		position: relative;
		z-index: 1;
	}

	.blueprint-summary {
		position: relative;
		padding: var(--space-6) var(--space-8);
		border: 1px solid var(--color-on-surface);
		background: var(--color-surface);
		max-width: 65ch;
		box-shadow: 10px 10px 0 var(--color-surface-container-low);
	}
	@media (min-width: 768px) {
		.blueprint-summary {
			margin-left: 20%;
		}
	}

	.dim-line {
		position: absolute;
		background: var(--color-primary);
		opacity: 0.2;
	}
	.dim-line--t {
		top: -20px;
		left: 0;
		right: 0;
		height: 1px;
	}
	.dim-line--t::before,
	.dim-line--t::after {
		content: '';
		position: absolute;
		top: -4px;
		width: 1px;
		height: 10px;
		background: currentColor;
	}
	.dim-line--t::before {
		left: 0;
	}
	.dim-line--t::after {
		right: 0;
	}

	.dim-line--l {
		left: -20px;
		top: 0;
		bottom: 0;
		width: 1px;
	}

	.blueprint-summary p {
		font-size: 1rem;
		line-height: 1.6;
		font-weight: 300;
	}

	.focus-tags {
		margin-top: var(--space-6);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		max-width: 60ch;
	}
	.focus-tag {
		font-size: 0.625rem;
		padding: 4px 10px;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
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
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--color-on-surface);
	}
	@media (min-width: 768px) {
		.spec-matrix {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.spec-cell {
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--color-outline-variant);
	}
	.spec-cell:last-child {
		border-right: none;
	}
	.spec-matrix.shared-boundary {
		background: var(--color-surface-container-lowest);
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

	/* ── BLUEPRINT SKILLS ── */
	.skills-blueprint {
		grid-template-columns: 1fr;
		background: var(--color-surface-container-lowest);
		background-image: radial-gradient(var(--color-outline-variant) 1px, transparent 1px);
		background-size: 20px 20px;
		border: 1px solid var(--color-on-surface);
		padding: 1px;
	}
	@media (min-width: 640px) {
		.skills-blueprint {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.skills-blueprint {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.blueprint-module {
		padding: var(--space-8);
		border: 1px solid var(--color-outline-variant);
		position: relative;
		transition: background 0.2s;
	}
	.blueprint-module:hover {
		background: var(--color-surface-container-lowest);
		box-shadow: inset 0 0 0 1px var(--color-primary);
	}

	.module-marker {
		position: absolute;
		width: 10px;
		height: 10px;
		color: var(--color-primary);
		opacity: 0.3;
		font-family: var(--font-mono);
		font-size: 10px;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.module-marker::before {
		content: '+';
	}
	.module-marker.tl {
		top: 4px;
		left: 4px;
	}
	.module-marker.tr {
		top: 4px;
		right: 4px;
	}
	.module-marker.bl {
		bottom: 4px;
		left: 4px;
	}
	.module-marker.br {
		bottom: 4px;
		right: 4px;
	}

	.module-label {
		font-size: 0.625rem;
		color: var(--color-primary);
		text-transform: uppercase;
		font-weight: 800;
		margin-bottom: var(--space-6);
		letter-spacing: 0.1em;
	}

	.module-nodes {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
	.node-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: 0.75rem;
		color: var(--color-on-surface-variant);
	}
	.node-item .dot {
		width: 4px;
		height: 4px;
		background: var(--color-outline);
		border-radius: 50%;
	}
	.node-item:hover .dot {
		background: var(--color-primary);
		transform: scale(1.5);
	}

	/* ── ROADMAP DYNAMICS ── */
	.roadmap-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		position: relative;
		padding-left: var(--space-6);
		border-left: 1px solid var(--color-on-surface);
	}

	@media (min-width: 1024px) {
		.roadmap-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-12);
			padding-left: 0;
			border-left: none;
		}
		.roadmap-grid::before {
			content: '';
			position: absolute;
			left: 50%;
			top: 0;
			bottom: 0;
			width: 1px;
			background: var(--color-on-surface);
			transform: translateX(-50%);
		}
	}

	.milestone-card {
		background: var(--color-surface-container-lowest);
		border: 1px solid var(--color-outline-variant);
		padding: var(--space-8);
		position: relative;
		transition: all 0.3s;
	}

	@media (min-width: 1024px) {
		.milestone-card {
			width: calc(100% - 40px);
		}
		.milestone-card.stagger {
			justify-self: end;
			margin-top: var(--space-20);
		}
	}

	.milestone-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-4px);
		box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
	}

	.milestone-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 800;
		margin-bottom: var(--space-4);
	}

	.milestone-content .title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		margin-bottom: var(--space-1);
		color: var(--color-on-surface);
	}

	.milestone-content .role {
		font-size: 0.6875rem;
		letter-spacing: 0.1em;
		opacity: 0.5;
		margin-bottom: var(--space-4);
	}

	.milestone-content .body {
		font-size: 0.875rem;
		line-height: 1.6;
		opacity: 0.7;
	}

	.milestone-edge {
		position: absolute;
		right: -1px;
		top: -1px;
		bottom: -1px;
		width: 4px;
		background: var(--color-primary);
		opacity: 0.1;
	}
	.milestone-card:hover .milestone-edge {
		opacity: 1;
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
