<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const developerFocus = getFocusByName('developer');

	const navItems = [
		{ label: 'Experience', href: '#experience' },
		{ label: 'Stack Matrix', href: '#matrix' },
		{ label: 'Education', href: '#education' }
	];
</script>

<PortalLayout {navItems} showBackButton={true}>
	<div class="developer-container">
		<!-- Hero Header Section -->
		<div class="hero-grid">
			<div class="hero-main">
				<div class="hero-ref">
					Ref: 018-ENG-SPEC<br />
					Scale: 1:1 Seniority<br />
					Sheet: 01/05
				</div>
				<span class="hero-badge">ENGINEERING SPECIFICATION</span>
				<h1 class="hero-title">
					Senior Full Stack<br />
					<span class="highlight">&amp; Frontend Architect</span>
				</h1>
				<p class="hero-description">
					18 years of structural engineering in digital environments. Specializing in
					high-performance architectures using Svelte, Vue.js, and the robust foundation of ASP.NET
					Core.
				</p>
				<div class="hero-meta">
					<div class="meta-item">
						<span class="meta-label">Current focus</span>
						<span class="meta-value">
							<span class="status-dot"></span>
							Freelance Consultant
						</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Location</span>
						<span class="meta-value">Remote / Global</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Availability</span>
						<span class="meta-value">Q2 2025</span>
					</div>
				</div>
			</div>
			<div class="hero-stats">
				<div class="stats-grid">
					<div class="stat-box">
						<span class="stat-value">18</span>
						<span class="stat-label">Years Exp.</span>
					</div>
					<div class="stat-box">
						<span class="stat-value">250+</span>
						<span class="stat-label">Deployments</span>
					</div>
					<div class="stat-box">
						<span class="stat-value">04</span>
						<span class="stat-label">Core Stacks</span>
					</div>
					<div class="stat-box">
						<span class="stat-value">2012</span>
						<span class="stat-label">B.Eng Grad</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Stack Matrix -->
		<section class="matrix-section" id="matrix">
			<div class="section-header">
				<div>
					<h2 class="section-title">TECHNICAL_STACK_MATRIX</h2>
					<p class="section-subtitle">Cross-functional expertise assessment</p>
				</div>
				<span class="section-mode">MODE: DETAILED_VIEW</span>
			</div>

			<div class="matrix-grid">
				{#if developerFocus?.skills}
					{#each developerFocus.skills as skillCategory}
						<div class="matrix-card">
							<div class="matrix-card-header">
								<span class="material-symbols-outlined"
									>{skillCategory.category === 'Frontend'
										? 'web'
										: skillCategory.category === 'Backend'
											? 'settings_ethernet'
											: skillCategory.category === 'Datos & DevOps'
												? 'database'
												: 'verified'}</span
								>
								<h3>{skillCategory.category.toUpperCase()}</h3>
							</div>
							<ul class="matrix-list">
								{#each skillCategory.items.slice(0, 4) as item, i}
									<li class="matrix-item">
										<span class="item-name">{item}</span>
										<div class="progress-bar">
											<div class="progress-fill" style="width: {95 - i * 3}%"></div>
										</div>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- Work History Timeline -->
		<section class="timeline-section" id="experience">
			<div class="section-header">
				<div>
					<h2 class="section-title">WORK_HISTORY_TIMELINE</h2>
					<p class="section-subtitle">Sequential professional development</p>
				</div>
			</div>

			<div class="timeline">
				{#each developerFocus?.experiences || [] as exp, index}
					<div class="timeline-item" class:active={index === 0}>
						<div class="timeline-period">
							<span class="period-text">{exp.period.replace(' - ', '_')}</span>
							<span class="period-status"
								>{index === 0
									? 'Status: Active'
									: `Duration: ${index === 1 ? '8.5 Years' : index === 2 ? '2 Years' : 'Early Career'}`}</span
							>
						</div>
						<div class="timeline-content">
							<div class="timeline-header">
								<h3 class="company">{exp.company}</h3>
								{#if index === 1}
									<span class="tenure-badge">Long Tenure</span>
								{/if}
							</div>
							<span class="position">{exp.position}</span>
							<p class="description">{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Education Section -->
		<section class="education-section" id="education">
			<div class="section-header">
				<div>
					<h2 class="section-title">ACADEMIC_CERTIFICATION</h2>
					<p class="section-subtitle">Verified educational credentials</p>
				</div>
			</div>

			<div class="education-grid">
				<div class="education-visual">
					<div class="graduation-icon">
						<span class="material-symbols-outlined">verified_user</span>
					</div>
				</div>
				<div class="education-content">
					<h3 class="degree">{cvData.education.degree}</h3>
					<p class="university">{cvData.education.university}</p>
					<div class="education-details">
						<div>
							<span class="detail-label">Concentration</span>
							<span class="detail-value">Software Architecture &amp; Information Systems</span>
						</div>
						<div>
							<span class="detail-label">Thesis Status</span>
							<span class="detail-value">Summa Cum Laude Honors</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.developer-container {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	/* Hero Grid */
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 1024px) {
		.hero-grid {
			grid-template-columns: 2fr 1fr;
		}
	}

	.hero-main {
		padding: 2rem;
		position: relative;
	}

	@media (min-width: 768px) {
		.hero-main {
			padding: 3rem;
		}
	}

	.hero-ref {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-align: right;
		line-height: 1.4;
		opacity: 0.5;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: var(--color-primary-container);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 900;
		line-height: 1.1;
		margin: 0 0 1.5rem 0;
		color: var(--color-on-surface);
	}

	.hero-title .highlight {
		color: var(--color-primary);
	}

	.hero-description {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--color-on-surface-variant);
		margin: 0 0 2rem 0;
		max-width: 42rem;
	}

	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.meta-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
	}

	.meta-value {
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: #22c55e;
		border-radius: 50%;
	}

	.hero-stats {
		background: var(--color-surface);
		border-top: 1px solid var(--color-outline-variant);
		padding: 1.5rem;
	}

	@media (min-width: 1024px) {
		.hero-stats {
			border-top: none;
			border-left: 1px solid var(--color-outline-variant);
		}
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.stat-box {
		padding: 1rem;
		background: var(--color-surface-container);
		border: 1px solid var(--color-outline-variant);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 2.5rem;
		font-weight: 900;
		color: var(--color-primary);
		line-height: 1;
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		margin-top: 0.5rem;
		display: block;
	}

	/* Section Header */
	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		.section-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.section-title {
		font-size: 1.5rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.section-subtitle {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		margin: 0.25rem 0 0 0;
	}

	.section-mode {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	/* Matrix Section */
	.matrix-section {
		padding: 2rem 0;
	}

	.matrix-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--color-outline-variant);
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.matrix-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.matrix-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.matrix-card {
		background: var(--color-surface);
		padding: 1.5rem;
		transition: background-color 0.2s ease;
	}

	.matrix-card:hover {
		background: var(--color-primary-container);
	}

	.matrix-card-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.matrix-card-header .material-symbols-outlined {
		color: var(--color-primary);
	}

	.matrix-card-header h3 {
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0;
		color: var(--color-on-surface);
	}

	.matrix-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.matrix-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.item-name {
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.progress-bar {
		height: 0.25rem;
		background: var(--color-primary-container);
		border-radius: 1rem;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		border-radius: 1rem;
	}

	/* Timeline Section */
	.timeline-section {
		padding: 2rem 0;
	}

	.timeline {
		display: flex;
		flex-direction: column;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.timeline-item {
			grid-template-columns: 12rem 1fr;
			gap: 2rem;
		}
	}

	.timeline-period {
		font-family: var(--font-mono);
	}

	.period-text {
		display: block;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-on-surface);
	}

	.period-status {
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
	}

	.timeline-item.active .period-text {
		color: var(--color-primary);
	}

	.timeline-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.company {
		font-size: 1.25rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0;
		color: var(--color-on-surface);
	}

	.tenure-badge {
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		text-transform: uppercase;
	}

	.position {
		display: block;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
	}

	.description {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-on-surface-variant);
		margin: 0;
		max-width: 48rem;
	}

	/* Education Section */
	.education-section {
		padding: 2rem 0;
	}

	.education-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.education-grid {
			grid-template-columns: 1fr 2fr;
		}
	}

	.education-visual {
		padding: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.education-visual {
			border-bottom: none;
			border-right: 1px solid var(--color-outline-variant);
		}
	}

	.graduation-icon {
		width: 8rem;
		height: 8rem;
		border: 4px double var(--color-primary);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: rotate(12deg);
	}

	.graduation-icon .material-symbols-outlined {
		font-size: 3rem;
		color: var(--color-primary);
	}

	.education-content {
		padding: 2rem;
		background: var(--color-surface);
	}

	.degree {
		font-size: 1.5rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
		color: var(--color-on-surface);
	}

	.university {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 1.5rem 0;
	}

	.education-details {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.education-details {
			grid-template-columns: 1fr 1fr;
		}
	}

	.detail-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.detail-value {
		font-weight: 600;
	}
</style>
