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
</script>

<svelte:head>
	<title>{focus?.title} — {cvData.personal.name}</title>
	<meta
		name="description"
		content="{focus?.title} — {cvData.personal.name}. {site.meta.description}"
	/>
</svelte:head>

<PortalLayout {navItems} showBackButton={true}>
	<div class="cv-container">
		<!-- ══ HEADER: Imprenta / Pliego ══ -->
		<section class="cv-header" id="perfil">
			<div class="header-top-rule">
				<div class="rule-thick"></div>
				<div class="rule-thin"></div>
			</div>

			<div class="header-inner">
				<div class="header-left">
					<div class="header-label-col">
						{#if focus?.subtitles}
							{#each focus.subtitles as sub}
								<span class="header-label">{sub}</span>
							{/each}
						{/if}
						<span class="header-label">{site.nav.exp_label}</span>
					</div>
					<h1 class="header-title">{focus?.title}</h1>
				</div>

				<div class="header-right">
					<div class="contact-block">
						<div class="contact-row">
							<span class="contact-key">{site.nav.location_label}</span>
							<span class="contact-val">{cvData.personal.location}</span>
						</div>
						<div class="contact-row">
							<span class="contact-key">{site.nav.phone_label}</span>
							<span class="contact-val">{cvData.personal.phone}</span>
						</div>
						<div class="contact-row">
							<span class="contact-key">{site.nav.email_label}</span>
							<a class="contact-val contact-link" href="mailto:{cvData.personal.email}"
								>{cvData.personal.email}</a
							>
						</div>
						<div class="contact-row">
							<span class="contact-key">{site.nav.web_label}</span>
							<a class="contact-val contact-link" href={cvData.personal.website} target="_blank"
								>benitoanagua.pages.dev</a
							>
						</div>
						<div class="contact-row">
							<span class="contact-key">{site.nav.behance_label}</span>
							<a class="contact-val contact-link" href={cvData.personal.behance} target="_blank"
								>behance.net/benitoanagua</a
							>
						</div>
					</div>
				</div>
			</div>

			<p class="header-summary">{focus?.summary}</p>

			<div class="header-bottom-rule">
				<div class="rule-thin"></div>
				<div class="rule-thick"></div>
			</div>
		</section>

		<!-- ══ CAPACIDADES ══ -->
		<section class="skills-section" id="habilidades">
			<h2 class="section-title">
				<span class="title-number">I.</span>
				{profileSite?.sections.habilidades}
				{site.nav.technical_label}
			</h2>

			<div class="skills-grid">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="skill-card">
							<div class="skill-card-top">
								<h3 class="skill-category">{skillGroup.category}</h3>
							</div>
							<ul class="skill-list">
								{#each skillGroup.items as item}
									<li class="skill-item">
										<span class="skill-marker">—</span>
										{item}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- ══ HISTORIAL ══ -->
		<section class="experience-section" id="experiencia">
			<h2 class="section-title">
				<span class="title-number">II.</span>
				{profileSite?.sections.experiencia}
				{site.nav.laboral_label}
			</h2>

			<div class="timeline">
				{#each focus?.experiences || [] as exp, index}
					<div class="timeline-item" class:is-current={index === 0}>
						<div class="timeline-left">
							<div class="timeline-marker">
								<span class="marker-line"></span>
								<span class="marker-dot" class:active={index === 0}></span>
							</div>
							<div class="timeline-period">
								<span class="period-dates">{exp.period}</span>
								<span class="period-role">{exp.position}</span>
							</div>
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
			<h2 class="section-title">
				<span class="title-number">III.</span>
				{profileSite?.sections.educacion} Académica
			</h2>

			<div class="education-grid">
				{#each cvData.education as entry}
					<div class="education-card">
						<div class="edu-top-bar"></div>
						<div class="edu-body">
							<span class="edu-year">{entry.year}</span>
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
		gap: 3.5rem;
	}

	.cv-header {
		padding: 0;
	}

	.header-top-rule,
	.header-bottom-rule {
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-bottom: 2rem;
	}

	.header-bottom-rule {
		margin-top: 2rem;
		margin-bottom: 0;
	}

	.rule-thick {
		height: 4px;
		background: var(--color-on-surface);
	}

	.rule-thin {
		height: 1px;
		background: var(--color-primary);
	}

	.header-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.header-inner {
			grid-template-columns: 1.5fr 1fr;
			gap: 3rem;
		}
	}

	.header-left {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.header-label-col {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.header-label {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.header-title {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2.75rem);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1.05;
		margin: 0;
		color: var(--color-on-surface);
	}

	.header-right {
		display: flex;
		align-items: flex-start;
	}

	.contact-block {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid var(--color-outline-variant);
	}

	.contact-row {
		display: grid;
		grid-template-columns: 5rem 1fr;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.contact-row:last-child {
		border-bottom: none;
	}

	.contact-key {
		padding: 0.5rem 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-primary);
		background: var(--color-surface-container-low);
		border-right: 1px solid var(--color-outline-variant);
		display: flex;
		align-items: center;
	}

	.contact-val {
		padding: 0.5rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-on-surface);
		display: flex;
		align-items: center;
	}

	.contact-link {
		color: var(--color-primary);
		text-decoration: none;
	}

	.contact-link:hover {
		text-decoration: underline;
	}

	.header-summary {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
		padding: 1.5rem 0;
		border-top: 1px solid var(--color-outline-variant);
	}

	.section-title {
		font-family: var(--font-display);
		font-size: 1.375rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1.75rem 0;
		color: var(--color-on-surface);
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding-bottom: 0.875rem;
		border-bottom: 4px solid var(--color-on-surface);
	}

	.title-number {
		font-size: 0.875rem;
		color: var(--color-primary);
		font-weight: 900;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
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
		border: 1px solid var(--color-outline);
		background: var(--color-surface);
		border-radius: var(--radius-smart);
		overflow: hidden;
		transition: all var(--duration-base) var(--ease-out);
	}

	.skill-card:hover {
		border-color: var(--color-primary);
		box-shadow: var(--ring-primary);
	}

	.skill-card-top {
		padding: 0.75rem 1rem;
		background: var(--color-surface-container-low);
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.skill-category {
		font-size: 0.625rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-primary);
		margin: 0;
	}

	.skill-list {
		list-style: none;
		padding: 0.875rem 1rem;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4375rem;
	}

	.skill-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--color-on-surface-variant);
	}

	.skill-marker {
		color: var(--color-primary);
		font-weight: 700;
		flex-shrink: 0;
	}

	.timeline {
		display: flex;
		flex-direction: column;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		padding: 1.75rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.timeline-item {
			grid-template-columns: 14rem 1fr;
			gap: 2rem;
		}
	}

	.timeline-item:last-child {
		border-bottom: none;
	}

	.timeline-left {
		display: flex;
		gap: 1rem;
	}

	.timeline-marker {
		display: none;
		flex-direction: column;
		align-items: center;
		gap: 0;
		flex-shrink: 0;
	}

	@media (min-width: 768px) {
		.timeline-marker {
			display: flex;
		}
	}

	.marker-line {
		width: 1px;
		flex: 1;
		background: var(--color-outline-variant);
		min-height: 1rem;
	}

	.marker-dot {
		width: 0.625rem;
		height: 0.625rem;
		border: 2px solid var(--color-outline-variant);
		background: var(--color-surface);
		flex-shrink: 0;
	}

	.marker-dot.active {
		border-color: var(--color-primary);
		background: var(--color-primary);
	}

	.timeline-period {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.period-dates {
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--color-on-surface);
		line-height: 1.4;
	}

	.timeline-item.is-current .period-dates {
		color: var(--color-primary);
	}

	.period-role {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		opacity: 0.6;
	}

	.company-name {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		margin: 0 0 0.625rem 0;
		color: var(--color-on-surface);
	}

	.exp-description {
		font-size: 0.875rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	.education-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.education-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.education-card {
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
		overflow: hidden;
	}

	.edu-top-bar {
		height: 3px;
		background: var(--color-primary);
	}

	.edu-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.edu-year {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-primary);
	}

	.edu-degree {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0;
		color: var(--color-on-surface);
		line-height: 1.2;
	}

	.edu-institution {
		font-size: 0.8125rem;
		color: var(--color-on-surface-variant);
		margin: 0;
	}
</style>
