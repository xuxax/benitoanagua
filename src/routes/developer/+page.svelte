<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const developerFocus = getFocusByName('developer');

	const navItems = [
		{ label: '01_Profile', href: '#profile' },
		{ label: '02_Tech_Stack', href: '#stack' },
		{ label: '03_Experience', href: '#experience' },
		{ label: '04_Education', href: '#education' }
	];
</script>

<PortalLayout {navItems} showBackButton={true}>
	<div class="profile-grid">
		<!-- Profile Section -->
		<section class="profile-section" id="profile">
			<div class="profile-content">
				<div class="profile-image">
					<img
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs6oLpS7hl_pU5OVuwT5G3-daplDGUS9OM7LUYblAGbo_0sgxuwmZ35VqjrEzWzwQaEgxXK9nQ4EGJlSUD_nLxG0QgHrIasz5Sps7mXqkWndXzVjIU2cbiQMCTpjdZAEDopS_YmnKgHObr-Y8LUn3UEjUXOmjh9KMKxQj0FaL0mK6T2FIWYXMq-Q1jlcuItUBiUYPOTkNC9LfMtgRPQwkbAxomowo2a-6mYy8MIA5jtD31ubcc7TbGHHu_GgzxIYq1bkvt9tOQAJGs"
						alt="Benito Anagua Ibarra"
					/>
				</div>
				<div class="profile-info">
					<div class="profile-badges">
						<span class="badge badge-primary">STATUS: ACTIVE_ENG</span>
						<span class="badge badge-secondary">LOC: TARIJA_BOL</span>
					</div>
					<h2 class="profile-title">
						Full Stack<br />
						<span class="highlight">Systems Engineer</span>
					</h2>
					<p class="profile-summary">
						{developerFocus?.summary}
					</p>
				</div>
			</div>
		</section>

		<!-- Sidebar Stats -->
		<aside class="stats-sidebar">
			<div class="stats-card">
				<span class="stats-label">Experience_Metrics</span>
				<div class="stats-grid">
					<div class="stat-item">
						<div class="stat-value">18</div>
						<div class="stat-label">Years_Professional</div>
					</div>
					<div class="stat-item">
						<div class="stat-value">150+</div>
						<div class="stat-label">Projects_Delivered</div>
					</div>
				</div>
			</div>

			<div class="contact-card">
				<span class="contact-label">Core_Contact_Data</span>
				<ul class="contact-list">
					<li>
						<span class="material-symbols-outlined">alternate_email</span>
						<span>{cvData.personal.email}</span>
					</li>
					<li>
						<span class="material-symbols-outlined">location_on</span>
						<span>{cvData.personal.location}</span>
					</li>
					<li>
						<span class="material-symbols-outlined">language</span>
						<span>{cvData.personal.github.split('/').pop()}</span>
					</li>
				</ul>
			</div>
		</aside>

		<!-- Tech Stack Section -->
		<section class="stack-section" id="stack">
			<div class="section-header">
				<h3 class="section-title">02. Technical_Stack_Matrix</h3>
				<span class="section-ref">REF_ID: STACK_MATRIX_V4</span>
			</div>

			<div class="stack-grid">
				{#if developerFocus?.skills}
					{#each developerFocus.skills as skillCategory}
						<div class="stack-card">
							<div class="stack-card-header">
								<span class="material-symbols-outlined"
									>{skillCategory.category === 'Frontend'
										? 'layers'
										: skillCategory.category === 'Backend'
											? 'terminal'
											: skillCategory.category === 'Datos & DevOps'
												? 'database'
												: 'palette'}</span
								>
								<h4>{skillCategory.category}</h4>
							</div>
							<ul class="stack-list">
								{#each skillCategory.items as item}
									<li>
										<span class="item-name">{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- Experience Section -->
		<section class="experience-section" id="experience">
			<div class="section-header">
				<h3 class="section-title">03. Professional_Experience</h3>
			</div>

			<div class="timeline">
				{#each developerFocus?.experiences || [] as exp, index}
					<div class="timeline-item" class:active={index === 0}>
						<div class="timeline-dot"></div>
						<div class="timeline-content">
							<div class="timeline-header">
								<div>
									<h4 class="company">{exp.company}</h4>
									<span class="position">{exp.position}</span>
								</div>
								<span class="period">{exp.period}</span>
							</div>
							<p class="description">{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Education Section -->
		<section class="education-section" id="education">
			<div class="section-header">
				<h3 class="section-title">04. Education</h3>
			</div>

			<div class="education-card">
				<span class="education-label">Degree_Ref</span>
				<h4 class="degree">{cvData.education.degree}</h4>
				<p class="university">{cvData.education.university}</p>
				<p class="year">Graduation: {cvData.education.year}</p>
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.profile-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--color-outline-variant);
	}

	@media (min-width: 1024px) {
		.profile-grid {
			grid-template-columns: 2fr 1fr;
		}
	}

	/* Profile Section */
	.profile-section {
		background: var(--color-surface);
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.profile-section {
			padding: 3rem;
		}
	}

	.profile-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.profile-content {
			flex-direction: row;
			gap: 3rem;
		}
	}

	.profile-image {
		width: 120px;
		height: 120px;
		flex-shrink: 0;
		border: 1px solid var(--color-outline-variant);
		overflow: hidden;
		background: var(--color-surface-variant);
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%);
	}

	.profile-info {
		flex: 1;
	}

	.profile-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.badge {
		font-size: 0.625rem;
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.badge-primary {
		background: var(--color-primary-container);
		color: var(--color-primary);
	}

	.badge-secondary {
		background: var(--color-surface-variant);
		color: var(--color-on-surface-variant);
	}

	.profile-title {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1;
		margin: 0 0 1rem 0;
		color: var(--color-on-surface);
	}

	.profile-title .highlight {
		color: var(--color-primary);
	}

	.profile-summary {
		font-size: 0.875rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
		max-width: 48rem;
	}

	/* Sidebar Stats */
	.stats-sidebar {
		background: var(--color-surface);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.stats-sidebar {
			grid-column: 2;
			grid-row: 1 / 3;
		}
	}

	.stats-card,
	.contact-card {
		border: 1px solid var(--color-outline-variant);
		padding: 1.5rem;
	}

	.stats-label,
	.contact-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.stat-item {
		border-left: 2px solid var(--color-primary);
		padding-left: 0.75rem;
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 900;
		line-height: 1;
		color: var(--color-on-surface);
	}

	.stat-label {
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-on-surface-variant);
		margin-top: 0.25rem;
	}

	.contact-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.contact-list li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.contact-list .material-symbols-outlined {
		font-size: 1rem;
		color: var(--color-primary);
	}

	/* Stack Section */
	.stack-section {
		background: var(--color-surface);
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.stack-section {
			padding: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.stack-section {
			grid-column: 1 / 3;
		}
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		.section-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
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

	.section-ref {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		color: var(--color-on-surface-variant);
	}

	.stack-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--color-outline-variant);
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.stack-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.stack-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stack-card {
		background: var(--color-surface);
		padding: 1.5rem;
	}

	.stack-card-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.stack-card-header .material-symbols-outlined {
		font-size: 1.25rem;
		color: var(--color-primary);
	}

	.stack-card-header h4 {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.stack-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stack-list li {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-on-surface-variant);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-surface-variant);
	}

	.stack-list li:last-child {
		border-bottom: none;
	}

	/* Experience Section */
	.experience-section {
		background: var(--color-surface);
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.experience-section {
			padding: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.experience-section {
			grid-column: 1 / 3;
		}
	}

	.timeline {
		position: relative;
		padding-left: 2rem;
		border-left: 2px solid var(--color-primary);
	}

	.timeline-item {
		position: relative;
		padding-bottom: 3rem;
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-dot {
		position: absolute;
		left: -2.25rem;
		top: 0;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--color-outline-variant);
	}

	.timeline-item.active .timeline-dot {
		background: var(--color-primary);
		transform: scale(1.5);
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.timeline-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	@media (min-width: 768px) {
		.timeline-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}
	}

	.company {
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		margin: 0;
		color: var(--color-on-surface);
	}

	.position {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.period {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		padding: 0.25rem 0.5rem;
		background: var(--color-surface-variant);
		color: var(--color-on-surface-variant);
		white-space: nowrap;
	}

	.description {
		font-size: 0.8125rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
		max-width: 56rem;
	}

	/* Education Section */
	.education-section {
		background: var(--color-surface);
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.education-section {
			padding: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.education-section {
			grid-column: 1 / 3;
		}
	}

	.education-card {
		border: 1px solid var(--color-outline-variant);
		padding: 1.5rem;
		max-width: 32rem;
	}

	.education-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
	}

	.degree {
		font-size: 1.25rem;
		font-weight: 800;
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
		color: var(--color-on-surface);
	}

	.university {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		margin: 0;
	}

	.year {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		color: var(--color-on-surface-variant);
		margin: 0.5rem 0 0 0;
	}
</style>
