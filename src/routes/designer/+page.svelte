<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const site = loadSiteData();
	const focus = getFocusByName('designer');
	const profileSite = site.nav.profiles.find((p) => p.href.includes('designer'));

	const navItems = profileSite
		? [
				{ label: profileSite.sections.perfil, href: '#perfil' },
				{ label: profileSite.sections.habilidades, href: '#habilidades' },
				{ label: profileSite.sections.experiencia, href: '#experiencia' },
				{ label: profileSite.sections.educacion, href: '#educacion' }
			]
		: [];
</script>

<svelte:head>
	<title>{focus?.title} — {cvData.personal.name}</title>
	<meta
		name="description"
		content="CV de {cvData.personal.name} como {focus?.title}. 18 años de experiencia."
	/>
</svelte:head>

<PortalLayout {navItems} showBackButton={true}>
	<div class="cv-container">
		<!-- ══ HEADER: Editorial / Magazine ══ -->
		<section class="cv-header" id="perfil">
			<div class="header-eyebrow">
				<span class="eyebrow-line"></span>
				<span class="eyebrow-text">{focus?.title} · 18 Años de Experiencia</span>
				<span class="eyebrow-line"></span>
			</div>

			<h1 class="header-title">{focus?.title}</h1>

			<div class="header-body">
				<div class="header-left">
					<p class="header-summary">{focus?.summary}</p>

					<div class="header-links">
						<a href="mailto:{cvData.personal.email}" class="link-item">
							<span class="material-symbols-outlined">mail</span>
							{cvData.personal.email}
						</a>
						<a href={cvData.personal.website} target="_blank" class="link-item">
							<span class="material-symbols-outlined">language</span>
							benitoanagua.pages.dev
						</a>
						<a href={cvData.personal.behance} target="_blank" class="link-item">
							<span class="material-symbols-outlined">palette</span>
							behance.net/benitoanagua
						</a>
						<a href={cvData.personal.linkedin} target="_blank" class="link-item">
							<span class="material-symbols-outlined">open_in_new</span>
							in/benito-anagua
						</a>
					</div>
				</div>

				<div class="header-right">
					<div class="info-block">
						<span class="info-label">Ubicación</span>
						<span class="info-value">{cvData.personal.location}</span>
					</div>
					<div class="info-block">
						<span class="info-label">Teléfono</span>
						<span class="info-value">{cvData.personal.phone}</span>
					</div>
					<div class="info-block">
						<span class="info-label">Experiencia</span>
						<span class="info-value info-accent">18 años</span>
					</div>
					<div class="info-block">
						<span class="info-label">Graduación</span>
						<span class="info-value">2012</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ══ HERRAMIENTAS ══ -->
		<section class="skills-section" id="habilidades">
			<div class="section-header">
				<h2 class="section-title">{profileSite?.sections.habilidades} & Metodología</h2>
				<div class="section-rule"></div>
			</div>

			<div class="skills-grid">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="skill-card">
							<h3 class="skill-category">{skillGroup.category}</h3>
							<ul class="skill-list">
								{#each skillGroup.items as item}
									<li class="skill-item">{item}</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- ══ TRAYECTORIA ══ -->
		<section class="experience-section" id="experiencia">
			<div class="section-header">
				<h2 class="section-title">{profileSite?.sections.experiencia} Profesional</h2>
				<div class="section-rule"></div>
			</div>

			<div class="timeline">
				{#each focus?.experiences || [] as exp, index}
					<div class="timeline-item" class:is-current={index === 0}>
						<div class="timeline-period">
							<span class="period-dates">{exp.period}</span>
							{#if index === 0}
								<span class="period-badge">Actual</span>
							{/if}
							<span class="period-role">{exp.position}</span>
						</div>
						<div class="timeline-content">
							<h3 class="company-name">{exp.company}</h3>
							<p class="exp-description">{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ══ FORMACIÓN ══ -->
		<section class="education-section" id="educacion">
			<div class="section-header">
				<h2 class="section-title">{profileSite?.sections.educacion}</h2>
				<div class="section-rule"></div>
			</div>

			<div class="education-list">
				{#each cvData.education as entry}
					<div class="education-item">
						<div class="edu-year-col">
							<span class="edu-year">{entry.year}</span>
						</div>
						<div class="edu-content-col">
							<h3 class="edu-degree">{entry.degree}</h3>
							<p class="edu-institution">{entry.institution}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	/* ... (mismos estilos que antes) ... */
	.cv-container {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.cv-header {
		padding: 3rem 0 2.5rem;
		border-bottom: 3px solid var(--color-on-surface);
	}

	.header-eyebrow {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.eyebrow-line {
		flex: 1;
		height: 1px;
		background: var(--color-primary);
	}

	.eyebrow-text {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.3em;
		color: var(--color-primary);
		white-space: nowrap;
	}

	.header-title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 8vw, 6rem);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 0.9;
		margin: 0;
		text-align: center;
		color: var(--color-on-surface);
	}

	.header-body {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.header-body {
			grid-template-columns: 2fr 1fr;
			gap: 4rem;
		}
	}

	.header-summary {
		font-size: 1rem;
		line-height: 1.75;
		color: var(--color-on-surface-variant);
		margin: 0 0 2rem 0;
	}

	.header-links {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.link-item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		font-size: 0.8125rem;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.link-item:hover {
		color: var(--color-primary);
	}

	.link-item .material-symbols-outlined {
		font-size: 1rem;
		color: var(--color-primary);
	}

	.header-right {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding-left: 0;
		border-left: none;
	}

	@media (min-width: 768px) {
		.header-right {
			padding-left: 2rem;
			border-left: 1px solid var(--color-outline-variant);
		}
	}

	.info-block {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.info-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-primary);
	}

	.info-value {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--color-on-surface);
	}

	.info-accent {
		color: var(--color-primary);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
		color: var(--color-on-surface);
		white-space: nowrap;
	}

	.section-rule {
		flex: 1;
		height: 1px;
		background: var(--color-outline-variant);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 640px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.skills-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.skill-card {
		padding: 2rem;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
		border-radius: var(--radius-smart);
		transition: all var(--duration-base) var(--ease-out);
	}

	.skill-card:hover {
		border-color: var(--color-primary);
		box-shadow: var(--ring-primary);
		transform: translateY(-2px);
	}

	.skill-category {
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		margin: 0 0 0.875rem 0;
	}

	.skill-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skill-item {
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		line-height: 1.4;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.timeline-item {
			grid-template-columns: 12rem 1fr;
			gap: 3rem;
		}
	}

	.timeline-item:last-child {
		border-bottom: none;
	}

	.timeline-period {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.period-dates {
		font-size: 1rem;
		font-weight: 900;
		color: var(--color-on-surface);
		line-height: 1.3;
	}

	.timeline-item.is-current .period-dates {
		color: var(--color-primary);
	}

	.period-badge {
		display: inline-block;
		padding: 0.125rem 0.625rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		width: fit-content;
	}

	.period-role {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-on-surface-variant);
		opacity: 0.6;
	}

	.company-name {
		font-size: 1.125rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		margin: 0 0 0.75rem 0;
		color: var(--color-on-surface);
	}

	.exp-description {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	.education-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.education-item {
		display: grid;
		grid-template-columns: 5rem 1fr;
		gap: 2rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
		align-items: start;
	}

	.education-item:last-child {
		border-bottom: none;
	}

	.edu-year-col {
		display: flex;
		align-items: flex-start;
		padding-top: 0.25rem;
	}

	.edu-year {
		font-size: 1.5rem;
		font-weight: 900;
		color: var(--color-primary);
		line-height: 1;
	}

	.edu-degree {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 0.25rem 0;
		color: var(--color-on-surface);
	}

	.edu-institution {
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		margin: 0;
	}
</style>
