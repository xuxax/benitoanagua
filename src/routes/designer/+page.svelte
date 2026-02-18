<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const designerFocus = getFocusByName('designer');

	const navItems = [
		{ label: 'Profile', href: '#profile' },
		{ label: 'Technical Specs', href: '#skills' },
		{ label: 'Timeline', href: '#experience' },
		{ label: 'Education', href: '#education' }
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
					<div class="image-overlay">
						<span class="overlay-label">Location</span>
						<span class="overlay-value">{cvData.personal.location}</span>
					</div>
				</div>

				<div class="profile-info">
					<span class="profile-label">Professional Profile</span>
					<h2 class="profile-title">Crafting functional digital architectures.</h2>
					<p class="profile-summary">
						{designerFocus?.summary}
					</p>

					<div class="profile-meta">
						<div class="meta-item">
							<span class="meta-label">Role</span>
							<span class="meta-value">Senior Designer</span>
						</div>
						<div class="meta-item">
							<span class="meta-label">Focus</span>
							<span class="meta-value">Technical Layout</span>
						</div>
						<div class="meta-item">
							<span class="meta-label">Language</span>
							<span class="meta-value">English / Spanish</span>
						</div>
						<div class="meta-item">
							<span class="meta-label">Experience</span>
							<span class="meta-value">18 Years</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Section -->
		<section class="skills-section" id="skills">
			<div class="section-header">
				<h3 class="section-title">Technical Specs</h3>
				<span class="section-ref">V.2024.01</span>
			</div>

			<div class="skills-grid">
				{#if designerFocus?.skills}
					{#each designerFocus.skills as skillCategory}
						<div class="skill-card">
							<div class="skill-icon">
								<span class="material-symbols-outlined">
									{skillCategory.category === 'Diseño'
										? 'pen_size_2'
										: skillCategory.category === 'Visual'
											? 'palette'
											: skillCategory.category === 'Web'
												? 'code'
												: 'settings_account_box'}
								</span>
							</div>
							<div class="skill-content">
								<h4>{skillCategory.category}</h4>
								<ul>
									{#each skillCategory.items.slice(0, 3) as item}
										<li>{item}</li>
									{/each}
								</ul>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</section>

		<!-- Experience Section -->
		<section class="experience-section" id="experience">
			<div class="section-header">
				<h3 class="section-title">Experience Timeline</h3>
			</div>

			<div class="timeline">
				{#each designerFocus?.experiences || [] as exp, index}
					<div class="timeline-item">
						<div class="timeline-header">
							<h4 class="company">{exp.company}</h4>
							<span class="period">{exp.period}</span>
						</div>
						<span class="position">{exp.position}</span>
						<p class="description">{exp.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Education Section -->
		<section class="education-section" id="education">
			<div class="section-header">
				<h3 class="section-title">Academic Background</h3>
			</div>

			<div class="education-grid">
				<div class="education-card">
					<span class="education-label">Degree Conferred</span>
					<h4>{cvData.education.degree}</h4>
					<p class="university">{cvData.education.university}</p>
				</div>

				<div class="education-card">
					<span class="education-label">Certifications</span>
					<ul class="cert-list">
						<li>Advanced UI/UX Specialization</li>
						<li>Front-end Architecture</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.profile-grid {
		display: flex;
		flex-direction: column;
		gap: 1px;
		background: var(--color-outline-variant);
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
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.profile-content {
			grid-template-columns: 300px 1fr;
			gap: 3rem;
		}
	}

	.profile-image {
		position: relative;
		aspect-ratio: 1;
		border: 1px solid var(--color-outline-variant);
		overflow: hidden;
		background: var(--color-surface-variant);
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%);
		transition: filter 0.3s ease;
	}

	.profile-image:hover img {
		filter: grayscale(0);
	}

	.image-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1rem;
		background: var(--color-surface);
		border-top: 1px solid var(--color-outline-variant);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.overlay-label {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
	}

	.overlay-value {
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.profile-label {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.profile-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 900;
		text-transform: uppercase;
		font-style: italic;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin: 0 0 1.5rem 0;
		color: var(--color-on-surface);
	}

	.profile-summary {
		font-size: 0.875rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0 0 2rem 0;
		max-width: 48rem;
	}

	.profile-meta {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.profile-meta {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.meta-label {
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		font-style: italic;
	}

	.meta-value {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	/* Skills Section */
	.skills-section {
		background: var(--color-surface);
		padding: 2rem;
		border-top: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.skills-section {
			padding: 3rem;
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
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.section-ref {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		color: var(--color-on-surface-variant);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
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
		border: 1px solid var(--color-outline-variant);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: border-color 0.2s ease;
	}

	.skill-card:hover {
		border-color: var(--color-primary);
	}

	.skill-icon {
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--color-outline-variant);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.skill-icon .material-symbols-outlined {
		font-size: 1.25rem;
		color: var(--color-primary);
	}

	.skill-content h4 {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 0.75rem 0;
		color: var(--color-on-surface);
	}

	.skill-content ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skill-content li {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--color-on-surface-variant);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.skill-content li::before {
		content: '';
		width: 4px;
		height: 4px;
		background: var(--color-primary);
	}

	/* Experience Section */
	.experience-section {
		background: var(--color-surface);
		padding: 2rem;
		border-top: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.experience-section {
			padding: 3rem;
		}
	}

	.timeline {
		display: flex;
		flex-direction: column;
	}

	.timeline-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.timeline-item:last-child {
		border-bottom: none;
	}

	.timeline-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	@media (min-width: 768px) {
		.timeline-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.company {
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		margin: 0;
		color: var(--color-on-surface);
	}

	.period {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		padding: 0.25rem 0.5rem;
		background: var(--color-surface-variant);
		color: var(--color-on-surface-variant);
	}

	.position {
		display: block;
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		margin-bottom: 0.75rem;
	}

	.description {
		font-size: 0.8125rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
		max-width: 48rem;
	}

	/* Education Section */
	.education-section {
		background: var(--color-surface);
		padding: 2rem;
		border-top: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.education-section {
			padding: 3rem;
		}
	}

	.education-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.education-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.education-card {
		border-left: 2px solid var(--color-primary);
		padding-left: 1.5rem;
	}

	.education-label {
		display: block;
		font-size: 0.625rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		color: var(--color-primary);
		margin-bottom: 0.5rem;
	}

	.education-card h4 {
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
		color: var(--color-on-surface);
	}

	.university {
		font-size: 0.8125rem;
		font-weight: 600;
		font-style: italic;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	.cert-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.cert-list li {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-on-surface);
	}
</style>
