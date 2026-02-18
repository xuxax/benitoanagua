<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const graphicFocus = getFocusByName('graphic');

	const navItems = [
		{ label: 'Profile', href: '#profile' },
		{ label: 'Technical Specs', href: '#skills' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Education', href: '#education' }
	];
</script>

<PortalLayout {navItems} showBackButton={true}>
	<div class="profile-grid">
		<!-- Profile Section -->
		<section class="profile-section" id="profile">
			<div class="profile-header">
				<span class="profile-label">01 // Profile</span>
				<h1 class="profile-name">
					Benito<br />Anagua Ibarra
				</h1>
				<p class="profile-role">Graphic Designer Integral</p>
			</div>

			<div class="profile-content">
				<div class="profile-image">
					<img
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nVt0x-vbFrKiOkLwd-9I5UltNiUNedeCbVu8ZA1PAd66u-82qw3pP6MPJl8fLsVqcjLHkx9BLvoRIBA8j3FbDgLv_JNxAsMsgv_lXFlZR_TZUV1z_Hg-S6eOWDSKV6NxiSDIiwtQiwwzaeAHFzQ00ulfKXz1oHBY7uWSuW-QB4DFEr0u6NZcvGomIhzz93P6oRcdoIH6sPgxyyC_oB_ubg4nHgJNYHAZIJjr4Sq2swDP-eTiieQH_6dW0WcIw1dMnDrXaBH0mlKM"
						alt="Benito Anagua Ibarra"
					/>
				</div>

				<div class="profile-info">
					<p class="profile-summary">
						{graphicFocus?.summary}
					</p>

					<div class="profile-foundations">
						<span class="foundations-label">Core Foundations</span>
						<ul class="foundations-list">
							<li>Structural Precision</li>
							<li>Technical Draftsmanship</li>
							<li>Brand Architecture</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Section -->
		<section class="skills-section" id="skills">
			<div class="section-header">
				<h2 class="section-title">Technical Specs</h2>
				<span class="section-ref">CODE: SKILLS_MATRIX</span>
			</div>

			<div class="skills-grid">
				{#if graphicFocus?.skills}
					{#each graphicFocus.skills as skillCategory, index}
						<div class="skill-card">
							<span class="skill-number">0{index + 2}</span>
							<h4 class="skill-title">{skillCategory.category}</h4>
							<ul class="skill-list">
								{#each skillCategory.items as item}
									<li>{item}</li>
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
				<h2 class="section-title">Work Experience</h2>
				<span class="section-ref">SECTION: 03_HISTORY</span>
			</div>

			<div class="timeline">
				{#each graphicFocus?.experiences || [] as exp, index}
					<div class="timeline-item">
						<div class="timeline-dot"></div>
						<div class="timeline-content">
							<div class="timeline-header">
								<h3 class="company">{exp.company}</h3>
								<span class="period">{exp.period}</span>
							</div>
							<p class="position">{exp.position}</p>
							<p class="description">{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Education Section -->
		<section class="education-section" id="education">
			<div class="section-header">
				<h2 class="section-title">Education</h2>
			</div>

			<div class="education-card">
				<span class="education-label">Academic Background</span>
				<h4>{cvData.education.degree}</h4>
				<p class="university">{cvData.education.university}</p>
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

	.profile-header {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.profile-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.profile-name {
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 0.9;
		margin: 0 0 1rem 0;
		color: var(--color-on-surface);
	}

	.profile-role {
		font-size: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		border-left: 3px solid var(--color-primary);
		padding-left: 1rem;
		margin: 0;
		color: var(--color-on-surface);
	}

	.profile-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.profile-content {
			grid-template-columns: 280px 1fr;
			gap: 3rem;
		}
	}

	.profile-image {
		aspect-ratio: 1;
		border: 1px solid var(--color-outline-variant);
		overflow: hidden;
		background: var(--color-surface-variant);
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%) contrast(1.2);
		mix-blend-mode: multiply;
		transition: all 0.5s ease;
	}

	.profile-image:hover img {
		filter: grayscale(0) contrast(1);
		mix-blend-mode: normal;
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.profile-summary {
		font-size: 0.9375rem;
		line-height: 1.7;
		font-weight: 500;
		margin: 0;
		color: var(--color-on-surface);
		max-width: 40rem;
	}

	.profile-foundations {
		padding-top: 1rem;
		border-top: 1px solid var(--color-outline-variant);
	}

	.foundations-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.foundations-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.foundations-list li {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-on-surface);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.foundations-list li::before {
		content: '';
		width: 6px;
		height: 6px;
		background: var(--color-on-surface);
	}

	/* Skills Section */
	.skills-section {
		background: var(--color-surface);
		padding: 2rem;
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
		transition: all 0.3s ease;
	}

	.skill-card:hover {
		background: var(--color-primary-container);
		border-color: var(--color-primary);
	}

	.skill-number {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-on-surface-variant);
		opacity: 0.5;
		margin-bottom: 0.75rem;
	}

	.skill-title {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		margin: 0 0 1rem 0;
		color: var(--color-on-surface);
	}

	.skill-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.skill-list li {
		font-size: 0.6875rem;
		font-weight: 600;
		line-height: 1.4;
		color: var(--color-on-surface-variant);
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
		position: relative;
		padding-left: 2rem;
		border-left: 1px solid var(--color-outline-variant);
	}

	.timeline-item {
		position: relative;
		padding-bottom: 2.5rem;
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-dot {
		position: absolute;
		left: -2.25rem;
		top: 0.25rem;
		width: 0.5rem;
		height: 0.5rem;
		background: var(--color-outline);
		border: 2px solid var(--color-primary);
		border-radius: 50%;
	}

	.timeline-item:first-child .timeline-dot {
		background: var(--color-primary);
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
			align-items: baseline;
		}
	}

	.company {
		font-size: 1.25rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.period {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
		white-space: nowrap;
	}

	.position {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		margin: 0;
	}

	.description {
		font-size: 0.8125rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0.5rem 0 0 0;
		max-width: 40rem;
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

	.education-card {
		border-left: 2px solid var(--color-primary);
		padding-left: 1.5rem;
	}

	.education-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-on-surface-variant);
		margin-bottom: 0.75rem;
	}

	.education-card h4 {
		font-size: 1.125rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 0.25rem 0;
		color: var(--color-on-surface);
	}

	.university {
		font-size: 0.8125rem;
		font-weight: 600;
		font-style: italic;
		color: var(--color-primary);
		margin: 0;
	}
</style>
