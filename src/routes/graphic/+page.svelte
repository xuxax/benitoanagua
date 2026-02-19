<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import { SITE_URL, ROUTES } from '$lib/config';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	let { data } = $props();

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
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />

	<!-- Schema.org markup for graphic page -->
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
					"name": "Graphic",
					"item": "{SITE_URL}{ROUTES.graphic}"
				}}
			]
		}}
	</script>
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

					<h1 class="hero-title">
						<span class="title-label mono">{focus?.title.split(' ')[0]}</span>
						<span class="solid-text">{focus?.title.split(' ').slice(1).join(' ')}</span>
					</h1>

					<div class="editorial-block">
						<div class="plate-divider"></div>
						<p class="summary">{focus?.summary}</p>
					</div>

					{#if focus?.subtitles}
						<div class="focus-tags">
							{#each focus.subtitles as tag}
								<span class="focus-tag mono">{tag.toUpperCase()}</span>
							{/each}
						</div>
					{/if}
				</div>

				<aside class="sidebar-plate shared-boundary">
					<div class="meta-module">
						<h3 class="mono label">PROD_LOCATION</h3>
						<span class="val">{cvData.personal.location}</span>
					</div>
					<div class="meta-module">
						<h3 class="mono label">PROD_EMAIL</h3>
						<span class="val">{cvData.personal.email}</span>
					</div>
					<div class="meta-module">
						<h3 class="mono label">PROD_EXPERIENCE</h3>
						<span class="val">{site.nav.exp_label}</span>
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

			<div class="shared-boundary skills-editorial">
				{#if focus?.skills}
					{#each focus.skills as skillGroup, i}
						<div class="editorial-plate plate--{['cyan', 'magenta', 'yellow', 'black'][i % 4]}">
							<div class="registration-marks">
								<div class="mark tl"></div>
								<div class="mark tr"></div>
								<div class="mark bl"></div>
								<div class="mark br"></div>
							</div>
							<div class="plate-sidebar mono">
								<span class="plate-code">P_{100 + i}</span>
								<div class="color-mark"></div>
							</div>
							<div class="plate-content">
								<h3 class="plate-title mono">{skillGroup.category.toUpperCase()}</h3>
								<ul class="plate-list">
									{#each skillGroup.items as item}
										<li>
											<span class="spot mono">●</span>
											{item}
										</li>
									{/each}
								</ul>
							</div>
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

			<div class="editorial-catalog">
				{#each focus?.experiences || [] as exp, index}
					<article class="catalog-entry">
						<div class="entry-header">
							<span class="series-num mono">0{index + 1}</span>
							<h3 class="entry-title">{exp.company}</h3>
						</div>
						<div class="entry-body">
							<div class="meta-strip mono">
								<span class="ref">PERIOD::{exp.period}</span>
								<span class="role">{exp.position}</span>
							</div>
							<p class="description">{exp.description}</p>
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

	.hero-title {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space-8);
		gap: var(--space-2);
	}
	@media (min-width: 768px) {
		.hero-title {
			margin-bottom: var(--space-12);
		}
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

	.focus-tags {
		margin-top: var(--space-8);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		max-width: 70ch;
	}
	.focus-tag {
		font-size: 0.625rem;
		padding: 2px 0;
		border-bottom: 2px solid var(--color-primary);
		font-weight: 800;
		letter-spacing: 0.1em;
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

	:root {
		--color-cmyk-c: #0088ff; /* High contrast cyan for light */
		--color-cmyk-m: #ff0088; /* High contrast magenta for light */
		--color-cmyk-y: #ffcc00; /* High contrast yellow for light */
		--color-cmyk-k: #1a1a1a; /* Rich black for light */
	}

	:global(.dark-theme) {
		--color-cmyk-c: #00ffff; /* Neon cyan for dark */
		--color-cmyk-m: #ff00ff; /* Neon magenta for dark */
		--color-cmyk-y: #ffff00; /* Neon yellow for dark */
		--color-cmyk-k: #ffffff; /* White for dark 'black' plate */
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

	/* ── EDITORIAL MATRIX ── */
	.skills-editorial {
		grid-template-columns: 1fr;
		gap: var(--space-8);
	}
	@media (min-width: 768px) {
		.skills-editorial {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.editorial-plate {
		display: grid;
		grid-template-columns: 40px 1fr;
		background: var(--color-surface-container-lowest);
		border-left: 4px solid var(--color-on-surface);
		transition: transform 0.2s;
		position: relative;
	}
	.editorial-plate:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
	}

	.registration-marks .mark {
		position: absolute;
		width: 10px;
		height: 10px;
		border: 1px solid var(--color-on-surface);
		opacity: 0.1;
	}
	.mark.tl {
		top: -5px;
		left: -5px;
	}
	.mark.tr {
		top: -5px;
		right: -5px;
	}
	.mark.bl {
		bottom: -5px;
		left: -5px;
	}
	.mark.br {
		bottom: -5px;
		right: -5px;
	}

	.plate-sidebar {
		background: var(--color-surface-container-low);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-4) 0;
		gap: var(--space-4);
		border-right: 1px dashed var(--color-outline-variant);
	}

	.plate-code {
		writing-mode: vertical-rl;
		font-size: 0.625rem;
		opacity: 0.4;
		transform: rotate(180deg);
	}

	.color-mark {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.plate--cyan .color-mark,
	.plate--cyan .spot {
		color: var(--color-cmyk-c);
	}
	.plate--magenta .color-mark,
	.plate--magenta .spot {
		color: var(--color-cmyk-m);
	}
	.plate--yellow .color-mark,
	.plate--yellow .spot {
		color: var(--color-cmyk-y);
	}
	.plate--black .color-mark,
	.plate--black .spot {
		color: var(--color-cmyk-k);
	}

	.plate--cyan .color-mark {
		background: var(--color-cmyk-c);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-cmyk-c) 20%, transparent);
	}
	.plate--magenta .color-mark {
		background: var(--color-cmyk-m);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-cmyk-m) 20%, transparent);
	}
	.plate--yellow .color-mark {
		background: var(--color-cmyk-y);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-cmyk-y) 20%, transparent);
	}
	.plate--black .color-mark {
		background: var(--color-cmyk-k);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-cmyk-k) 20%, transparent);
	}

	.plate-content {
		padding: var(--space-6);
	}

	.plate-title {
		font-size: 0.6875rem;
		font-weight: 800;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.plate-list {
		list-style: none;
		font-size: 0.8125rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-1);
	}
	.plate-list li {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}
	.plate-list .spot {
		font-size: 8px;
	}

	/* ── EDITORIAL CATALOG ── */
	.editorial-catalog {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
		margin-top: var(--space-8);
	}

	.catalog-entry {
		border-bottom: 2px solid var(--color-on-surface);
		padding-bottom: var(--space-8);
	}

	.entry-header {
		display: flex;
		align-items: baseline;
		gap: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.series-num {
		font-size: 2rem;
		font-weight: 900;
		color: var(--color-primary);
		line-height: 1;
		opacity: 0.2;
	}

	.entry-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		text-transform: uppercase;
		line-height: 1.1;
		flex: 1;
	}

	@media (min-width: 768px) {
		.entry-title {
			font-size: 1.75rem;
		}
	}

	.entry-body {
		padding-left: 0;
	}
	@media (min-width: 768px) {
		.entry-body {
			padding-left: 100px;
		}
	}

	.meta-strip {
		display: flex;
		justify-content: space-between;
		padding: var(--space-2) 0;
		border-top: 1px solid var(--color-outline-variant);
		border-bottom: 1px solid var(--color-outline-variant);
		font-size: 0.6875rem;
		font-weight: 700;
		margin-bottom: var(--space-4);
	}

	.meta-strip .role {
		color: var(--color-primary);
	}

	.description {
		font-size: 1rem;
		line-height: 1.6;
		opacity: 0.8;
		max-width: 70ch;
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
