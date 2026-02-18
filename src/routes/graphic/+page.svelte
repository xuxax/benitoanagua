<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = $derived(loadCVData());
	const site = $derived(loadSiteData());
	const focus = $derived(getFocusByName('graphic'));
	const profileSite = $derived(site.nav.profiles.find((p) => p.href.includes('graphic')));

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
	<div class="cv-container graphic-portal">
		<!-- ══ HEADER: Press Proof Spec ══ -->
		<header class="press-header" id="perfil">
			<div class="press-sheet-frame shared-boundary">
				<div class="main-plate">
					<!-- Registration Marks -->
					<div class="reg-mark tl"></div>
					<div class="reg-mark tr"></div>
					<div class="reg-mark bl"></div>
					<div class="reg-mark br"></div>

					<div class="press-info mono">
						<span>REF::2026_GFX_PLATE_03</span>
						<div class="color-control-strip">
							<div class="c"></div>
							<div class="m"></div>
							<div class="y"></div>
							<div class="k"></div>
						</div>
					</div>

					<h1 class="hero-title">
						<span class="stroke-text">{focus?.title.split(' ')[0]}</span>
						<span class="solid-text">{focus?.title.split(' ').slice(1).join(' ')}</span>
					</h1>

					<div class="editorial-block">
						<div class="plate-divider"></div>
						<p class="summary">{focus?.summary}</p>
					</div>

					<div class="plate-base mono">
						<span>RESOLUTION::300DPI</span>
						<span>OUTPUT::EDITORIAL_PRESET</span>
					</div>
				</div>

				<aside class="sidebar-plate shared-boundary">
					<div class="meta-module">
						<h3 class="mono label">PROD_LOCATION</h3>
						<span class="val">{cvData.personal.location}</span>
					</div>
					<div class="meta-module">
						<h3 class="mono label">OUTPUT_CHANNELS</h3>
						<div class="channel-stack">
							<a href={cvData.personal.behance} target="_blank" class="mono channel"
								>//BEHANCE_PORTFOLIO</a
							>
							<a href={cvData.personal.website} target="_blank" class="mono channel">//PROD_SITE</a>
						</div>
					</div>
					<div class="meta-module">
						<h3 class="mono label">TECH_SPECS</h3>
						<div class="spec-list mono">
							<span>SCALE_1:1</span>
							<span>COLOR_SPOT_PANTONE</span>
						</div>
					</div>
				</aside>
			</div>
		</header>

		<!-- ══ SKILLS: Production Matrix ══ -->
		<section class="section-blueprint" id="habilidades">
			<header class="section-label-press">
				<div class="box">CAPABILITIES_MATRIX</div>
				<div class="rule"></div>
			</header>

			<div class="shared-boundary skills-press">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="press-module">
							<div class="module-overline"></div>
							<h3 class="module-title-editorial">{skillGroup.category.toUpperCase()}</h3>
							<ul class="module-list-press">
								{#each skillGroup.items as item}
									<li><span class="bullet">+</span> {item}</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- ══ EXPERIENCE: Production Log ══ -->
		<section class="section-blueprint" id="experiencia">
			<header class="section-label-press">
				<div class="box">PRODUCTION_LOG_EXPERIENCE</div>
				<div class="rule"></div>
			</header>

			<div class="editorial-timeline">
				{#each focus?.experiences || [] as exp, index}
					<article class="timeline-article" class:active={index === 0}>
						<div class="article-meta">
							<span class="year-stamp mono">{extractYear(exp.period)}</span>
							{#if index === 0}<div class="active-rule">RELEASED</div>{/if}
						</div>
						<div class="article-main">
							<h3 class="article-company">{exp.company}</h3>
							<span class="article-role mono">{exp.position}</span>
							<p class="article-desc">{exp.description}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ══ EDUCATION: Certified Press ══ -->
		<section class="section-blueprint" id="educacion">
			<header class="section-label-press">
				<div class="box">ACCREDITATION_PLATES</div>
				<div class="rule"></div>
			</header>

			<div class="shared-boundary edu-press">
				{#each cvData.education as entry}
					<div class="press-ticket">
						<div class="ticket-sidestrip"></div>
						<div class="ticket-body">
							<span class="mono year">PLATE_REF::{entry.year}</span>
							<h4 class="degree">{entry.degree.toUpperCase()}</h4>
							<p class="inst mono">{entry.institution.toUpperCase()}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.graphic-portal {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}
	@media (min-width: 768px) {
		.graphic-portal {
			gap: var(--space-20);
		}
	}

	/* ── REGISTRATION MARKS ── */
	.reg-mark {
		position: absolute;
		width: 20px;
		height: 20px;
		border: 0.5px solid var(--color-on-surface);
		opacity: 0.3;
	}
	@media (min-width: 768px) {
		.reg-mark {
			width: 30px;
			height: 30px;
		}
	}

	.reg-mark::before,
	.reg-mark::after {
		content: '';
		position: absolute;
		background: var(--color-on-surface);
	}
	.reg-mark::before {
		top: 50%;
		left: 0;
		width: 100%;
		height: 0.5px;
		transform: translateY(-50%);
	}
	.reg-mark::after {
		left: 50%;
		top: 0;
		width: 0.5px;
		height: 100%;
		transform: translateX(-50%);
	}
	.reg-mark.tl {
		top: var(--space-2);
		left: var(--space-2);
	}
	.reg-mark.tr {
		top: var(--space-2);
		right: var(--space-2);
	}
	.reg-mark.bl {
		bottom: var(--space-2);
		left: var(--space-2);
	}
	.reg-mark.br {
		bottom: var(--space-2);
		right: var(--space-2);
	}

	@media (min-width: 768px) {
		.reg-mark.tl {
			top: var(--space-4);
			left: var(--space-4);
		}
		.reg-mark.tr {
			top: var(--space-4);
			right: var(--space-4);
		}
		.reg-mark.bl {
			bottom: var(--space-4);
			left: var(--space-4);
		}
		.reg-mark.br {
			bottom: var(--space-4);
			right: var(--space-4);
		}
	}

	/* ── HEADER ── */
	.press-sheet-frame {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-on-surface);
	}
	@media (min-width: 1024px) {
		.press-sheet-frame {
			grid-template-columns: 1.6fr 1.4fr;
		}
	}

	.main-plate {
		position: relative;
		padding: var(--space-10) var(--space-4);
		background: var(--color-surface);
	}
	@media (min-width: 768px) {
		.main-plate {
			padding: var(--space-16) var(--space-10);
		}
	}

	.press-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.5rem;
		opacity: 0.4;
		margin-bottom: var(--space-8);
	}
	@media (min-width: 768px) {
		.press-info {
			font-size: 0.625rem;
			margin-bottom: var(--space-12);
		}
	}

	.color-control-strip {
		display: flex;
		gap: 1px;
	}
	.color-control-strip div {
		width: 8px;
		height: 8px;
		border: 1px solid var(--color-outline-variant);
	}
	@media (min-width: 768px) {
		.color-control-strip div {
			width: 12px;
			height: 12px;
		}
	}

	.c {
		background: #00ffff;
	}
	.m {
		background: #ff00ff;
	}
	.y {
		background: #ffff00;
	}
	.k {
		background: #000;
	}

	.hero-title {
		display: flex;
		flex-direction: column;
		line-height: 0.8;
		margin-bottom: var(--space-8);
	}
	@media (min-width: 768px) {
		.hero-title {
			margin-bottom: var(--space-12);
		}
	}

	.stroke-text {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 12vw, 6rem);
		color: transparent;
		-webkit-text-stroke: 1px var(--color-on-surface);
		opacity: 0.5;
	}
	.solid-text {
		font-family: var(--font-display);
		font-size: clamp(2rem, 10vw, 5.5rem);
	}

	.editorial-block {
		display: flex;
		gap: var(--space-4);
	}
	@media (min-width: 768px) {
		.editorial-block {
			gap: var(--space-8);
		}
	}

	.plate-divider {
		width: 4px;
		background: var(--color-on-surface);
	}
	@media (min-width: 768px) {
		.plate-divider {
			width: 8px;
		}
	}

	.summary {
		font-size: 1.125rem;
		font-family: var(--font-body);
		line-height: 1.5;
		font-weight: 300;
	}
	@media (min-width: 768px) {
		.summary {
			font-size: 1.25rem;
			line-height: 1.6;
		}
	}

	.plate-base {
		margin-top: var(--space-8);
		border-top: 1px solid var(--color-outline-variant);
		padding-top: var(--space-4);
		display: flex;
		justify-content: space-between;
		font-size: 0.5rem;
		opacity: 0.3;
	}
	@media (min-width: 768px) {
		.plate-base {
			margin-top: var(--space-12);
		}
	}

	.sidebar-plate {
		grid-template-columns: 1fr;
	}
	@media (max-width: 1024px) and (min-width: 640px) {
		.sidebar-plate {
			grid-template-columns: 1fr 1fr;
		}
	}

	.meta-module {
		padding: var(--space-6);
		border-bottom: 1px solid var(--color-on-surface);
	}
	@media (min-width: 768px) {
		.meta-module {
			padding: var(--space-8);
		}
	}

	.meta-module:last-child {
		border-bottom: none;
	}
	.meta-module h3 {
		font-size: 0.625rem;
		opacity: 0.4;
		margin-bottom: var(--space-3);
	}
	.channel-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.channel {
		font-size: 0.6875rem;
		text-decoration: none;
		color: var(--color-on-surface);
		font-weight: 700;
		transition: color 0.2s;
	}
	.channel:hover {
		color: var(--color-primary);
	}
	.spec-list {
		display: flex;
		flex-direction: column;
		font-size: 0.5rem;
		opacity: 0.6;
	}

	/* ── SECTIONS ── */
	.section-label-press {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}
	@media (min-width: 768px) {
		.section-label-press {
			margin-bottom: var(--space-8);
		}
	}

	.section-label-press .box {
		background: var(--color-on-surface);
		color: var(--color-surface);
		padding: 4px 10px;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 900;
	}
	.section-label-press .rule {
		flex: 1;
		height: 2px;
		background: var(--color-on-surface);
	}
	@media (min-width: 768px) {
		.section-label-press .rule {
			height: 4px;
		}
	}

	.skills-press {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-on-surface);
	}
	@media (min-width: 640px) {
		.skills-press {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.skills-press {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.press-module {
		padding: var(--space-6);
		position: relative;
	}
	@media (min-width: 768px) {
		.press-module {
			padding: var(--space-8);
		}
	}

	.press-module:hover {
		background: var(--color-surface-container-lowest);
	}
	.module-overline {
		height: 4px;
		background: var(--color-primary);
		width: 30px;
		margin-bottom: var(--space-3);
	}
	.module-title-editorial {
		font-family: var(--font-display);
		font-size: 1rem;
		margin-bottom: var(--space-4);
		text-transform: uppercase;
	}
	.module-list-press {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		font-size: 0.75rem;
	}
	.bullet {
		color: var(--color-primary);
		font-weight: 900;
		margin-right: 4px;
	}

	/* ── TIMELINE ── */
	.editorial-timeline {
		display: flex;
		flex-direction: column;
	}
	.timeline-article {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--color-on-surface);
	}
	@media (min-width: 768px) {
		.timeline-article {
			grid-template-columns: 100px 1fr;
			gap: var(--space-12);
			padding: var(--space-12) 0;
		}
	}

	.article-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	@media (min-width: 768px) {
		.article-meta {
			align-items: flex-end;
		}
	}

	.year-stamp {
		font-size: 2rem;
		font-weight: 900;
		opacity: 0.1;
		line-height: 0.8;
	}
	@media (min-width: 768px) {
		.year-stamp {
			font-size: 3rem;
		}
	}

	.active .year-stamp {
		opacity: 1;
		color: var(--color-primary);
	}
	.active-rule {
		background: var(--color-primary);
		color: var(--color-background);
		font-family: var(--font-mono);
		font-size: 0.5rem;
		padding: 2px 6px;
		margin-top: 4px;
	}

	.article-company {
		font-family: var(--font-display);
		font-size: 1.5rem;
		text-transform: uppercase;
		margin-bottom: 2px;
	}
	@media (min-width: 768px) {
		.article-company {
			font-size: 2rem;
		}
	}

	.article-role {
		font-size: 0.6875rem;
		font-weight: 700;
		color: var(--color-primary);
		margin-bottom: var(--space-3);
		display: block;
	}
	.article-desc {
		font-size: 0.875rem;
		line-height: 1.6;
		opacity: 0.8;
		max-width: 65ch;
	}

	/* ── EDU ── */
	.edu-press {
		grid-template-columns: 1fr;
		border: 1px solid var(--color-on-surface);
	}
	@media (min-width: 640px) {
		.edu-press {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.press-ticket {
		display: flex;
		transition: background 0.3s;
	}
	.press-ticket:hover {
		background: var(--color-surface-container-low);
	}
	.ticket-sidestrip {
		width: 4px;
		background: var(--color-on-surface);
	}
	.ticket-body {
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.ticket-body .year {
		font-size: 0.5625rem;
		opacity: 0.4;
	}
	.ticket-body .degree {
		font-family: var(--font-display);
		font-size: 0.8125rem;
	}
	.ticket-body .inst {
		font-size: 0.5625rem;
		color: var(--color-primary);
		font-weight: 700;
	}
</style>
