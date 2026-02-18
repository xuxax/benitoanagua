<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const site = loadSiteData();
	const focus = getFocusByName('developer');
	const profileSite = site.nav.profiles.find((p) => p.href.includes('developer'));

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
		<!-- ══ HEADER: Blueprint técnico ══ -->
		<section class="cv-header" id="perfil">
			<div class="header-main">
				<div class="header-ref-bar">
					<span class="ref-item">REF: 018-ENG-SPEC</span>
					<span class="ref-sep">|</span>
					<span class="ref-item">SHEET: {profileSite?.code || '01/03'}</span>
					<span class="ref-sep">|</span>
					<span class="ref-item">SCALE: 1:1</span>
				</div>

				<div class="header-badge-row">
					<span class="header-badge">
						<span class="badge-dot"></span>
						ENGINEERING SPECIFICATION
					</span>
				</div>

				<h1 class="header-title">{focus?.title}</h1>
				<p class="header-summary">{focus?.summary}</p>

				<div class="header-meta">
					<div class="meta-item">
						<span class="meta-label">// location</span>
						<span class="meta-value">{cvData.personal.location}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">// phone</span>
						<span class="meta-value">{cvData.personal.phone}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">// email</span>
						<a class="meta-value meta-link" href="mailto:{cvData.personal.email}"
							>{cvData.personal.email}</a
						>
					</div>
					<div class="meta-item">
						<span class="meta-label">// web</span>
						<a class="meta-value meta-link" href={cvData.personal.website} target="_blank"
							>benitoanagua.pages.dev</a
						>
					</div>
					<div class="meta-item">
						<span class="meta-label">// github</span>
						<a class="meta-value meta-link" href={cvData.personal.github} target="_blank"
							>@benitoanagua</a
						>
					</div>
					<div class="meta-item">
						<span class="meta-label">// linkedin</span>
						<a class="meta-value meta-link" href={cvData.personal.linkedin} target="_blank"
							>in/benito-anagua</a
						>
					</div>
				</div>
			</div>

			<div class="header-stats">
				<div class="stat-box">
					<span class="stat-value">18</span>
					<span class="stat-label">YRS_EXP</span>
				</div>
				<div class="stat-box">
					<span class="stat-value">04</span>
					<span class="stat-label">STACKS</span>
				</div>
				<div class="stat-box">
					<span class="stat-value">06</span>
					<span class="stat-label">EMPLOYERS</span>
				</div>
				<div class="stat-box accent">
					<span class="stat-value">2012</span>
					<span class="stat-label">B.ENG</span>
				</div>
			</div>
		</section>

		<!-- ══ STACK MATRIX ══ -->
		<section class="skills-section" id="habilidades">
			<div class="section-header">
				<div class="section-title-group">
					<span class="section-index">01</span>
					<h2 class="section-title">{profileSite?.sections.habilidades.toUpperCase()}_MATRIX</h2>
				</div>
				<span class="section-mode">MODE: DETAILED_VIEW</span>
			</div>

			<div class="skills-grid">
				{#if focus?.skills}
					{#each focus.skills as skillGroup}
						<div class="skill-card">
							<div class="skill-card-header">
								<h3 class="skill-category">{skillGroup.category.toUpperCase()}</h3>
								<span class="skill-count">{skillGroup.items.length} items</span>
							</div>
							<ul class="skill-list">
								{#each skillGroup.items as item}
									<li class="skill-item">
										<span class="skill-prompt">›</span>
										{item}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- ══ WORK HISTORY TIMELINE ══ -->
		<section class="experience-section" id="experiencia">
			<div class="section-header">
				<div class="section-title-group">
					<span class="section-index">02</span>
					<h2 class="section-title">{profileSite?.sections.experiencia.toUpperCase()}_TIMELINE</h2>
				</div>
			</div>

			<div class="timeline">
				{#each focus?.experiences || [] as exp, index}
					<div class="timeline-item" class:is-current={index === 0}>
						<div class="timeline-period">
							<span class="period-dates">{exp.period.replace(' - ', '_')}</span>
							{#if index === 0}
								<span class="period-badge">STATUS: ACTIVE</span>
							{:else if index === 1}
								<span class="period-note">LONG_TENURE</span>
							{/if}
						</div>
						<div class="timeline-content">
							<div class="timeline-header">
								<h3 class="company-name">{exp.company}</h3>
								<span class="position-name">{exp.position}</span>
							</div>
							<p class="exp-description">{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ══ ACADEMIC CERTIFICATION ══ -->
		<section class="education-section" id="educacion">
			<div class="section-header">
				<div class="section-title-group">
					<span class="section-index">03</span>
					<h2 class="section-title">
						{profileSite?.sections.educacion.toUpperCase()}_CERTIFICATION
					</h2>
				</div>
			</div>

			<div class="education-grid">
				{#each cvData.education as entry}
					<div class="education-card">
						<span class="material-symbols-outlined edu-icon">verified_user</span>
						<div class="edu-body">
							<h3 class="edu-degree">{entry.degree}</h3>
							<p class="edu-institution">{entry.institution}</p>
							<span class="edu-year">{entry.year}</span>
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
		gap: 3rem;
	}

	.cv-header {
		display: grid;
		grid-template-columns: 1fr;
		border: 2px solid var(--color-on-surface);
	}

	@media (min-width: 1024px) {
		.cv-header {
			grid-template-columns: 2fr 1fr;
		}
	}

	.header-main {
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.header-main {
			padding: 2.5rem;
		}
	}

	.header-ref-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-on-surface-variant);
		opacity: 0.5;
		margin-bottom: 1.25rem;
	}

	.ref-sep {
		opacity: 0.3;
	}

	.header-badge-row {
		margin-bottom: 1rem;
	}

	.header-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem;
		background: var(--color-primary-container);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.badge-dot {
		width: 0.375rem;
		height: 0.375rem;
		background: var(--color-primary);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.header-title {
		font-size: clamp(1.375rem, 3.5vw, 2.25rem);
		font-weight: 900;
		line-height: 1.1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0 0 1.25rem 0;
		color: var(--color-on-surface);
	}

	.header-summary {
		font-size: 0.875rem;
		line-height: 1.75;
		color: var(--color-on-surface-variant);
		margin: 0 0 2rem 0;
	}

	.header-meta {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.625rem 2rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.header-meta {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.meta-label {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		color: var(--color-primary);
		letter-spacing: 0.05em;
	}

	.meta-value {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-on-surface);
	}

	.meta-link {
		color: var(--color-on-surface-variant);
		text-decoration: none;
	}
	.meta-link:hover {
		color: var(--color-primary);
	}

	.header-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border-top: 2px solid var(--color-on-surface);
	}

	@media (min-width: 1024px) {
		.header-stats {
			border-top: none;
			border-left: 2px solid var(--color-on-surface);
		}
	}

	.stat-box {
		padding: 1.5rem;
		border: 1px solid var(--color-outline-variant);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		background: var(--color-surface);
	}

	.stat-box.accent {
		background: var(--color-primary-container);
	}

	.stat-value {
		font-size: 2.25rem;
		font-weight: 900;
		line-height: 1;
		color: var(--color-primary);
		font-family: var(--font-mono);
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-on-surface-variant);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;
		padding-bottom: 0.75rem;
		border-bottom: 2px solid var(--color-on-surface);
	}

	.section-title-group {
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}

	.section-index {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-primary);
		letter-spacing: 0.1em;
	}

	.section-title {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.section-mode {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		color: var(--color-primary);
		letter-spacing: 0.1em;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--color-on-surface);
		border: 1px solid var(--color-on-surface);
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
		background: var(--color-surface);
		padding: 1.25rem;
	}

	.skill-card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.875rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.skill-category {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0;
		letter-spacing: 0.1em;
	}

	.skill-count {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-on-surface-variant);
		opacity: 0.5;
	}

	.skill-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.skill-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--color-on-surface-variant);
	}

	.skill-prompt {
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
			grid-template-columns: 13rem 1fr;
			gap: 2rem;
		}
	}

	.timeline-item:last-child {
		border-bottom: none;
	}

	.timeline-period {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.period-dates {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-on-surface);
		line-height: 1.5;
	}

	.timeline-item.is-current .period-dates {
		color: var(--color-primary);
	}

	.period-badge {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		width: fit-content;
	}

	.period-note {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 700;
		color: var(--color-on-surface-variant);
		opacity: 0.5;
		letter-spacing: 0.1em;
	}

	.timeline-header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 0.625rem;
	}

	.company-name {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.position-name {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.exp-description {
		font-size: 0.875rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	.education-grid {
		display: flex;
		flex-direction: column;
		gap: 1px;
		background: var(--color-on-surface);
		border: 1px solid var(--color-on-surface);
	}

	.education-card {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem;
		background: var(--color-surface);
	}

	.edu-icon {
		font-size: 2rem;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.edu-body {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.edu-degree {
		font-family: var(--font-mono);
		font-size: 0.9375rem;
		font-weight: 700;
		text-transform: uppercase;
		margin: 0;
		color: var(--color-on-surface);
	}

	.edu-institution {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	.edu-year {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 700;
		letter-spacing: 0.1em;
	}
</style>
