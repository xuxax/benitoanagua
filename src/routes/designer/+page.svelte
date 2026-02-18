<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const designerFocus = getFocusByName('designer');

	const navItems = [
		{ label: 'Skills Matrix', href: '#matrix' },
		{ label: 'Methodology', href: '#methodology' },
		{ label: 'Experience', href: '#experience' }
	];

	const skillsData = [
		{ category: 'Tooling', skill: 'Figma', proficiency: 98 },
		{ category: 'Systems', skill: 'Design Systems', proficiency: 95 },
		{ category: 'Prototyping', skill: 'Hi-Fi Logic', proficiency: 92 },
		{ category: 'Engineering', skill: 'Frontend Dev', proficiency: 85 }
	];
</script>

<PortalLayout {navItems} showBackButton={true}>
	<div class="designer-container">
		<!-- Hero Section -->
		<section class="hero-section">
			<div class="hero-label-row">
				<span class="label-line"></span>
				<span class="hero-label">Est. 2006 — Senior Professional</span>
			</div>
			<h1 class="hero-title">
				18 YEARS OF <span class="highlight">SYSTEMATIC</span> DESIGN
			</h1>
			<p class="hero-description">
				Specializing in Figma, Design Systems, and High-Fidelity Prototyping with a rigid
				architectural approach to digital products.
			</p>
			<div class="hero-actions">
				<a href="#contact" class="btn-primary">
					View Portfolio
					<span class="material-symbols-outlined">arrow_forward</span>
				</a>
				<div class="education-badge">
					<span class="material-symbols-outlined">school</span>
					<div>
						<p class="badge-label">Licenciatura en Ingeniería de Informática</p>
						<p class="badge-value">UNIVERSITY CLASS OF 2012</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Matrix Section -->
		<section class="matrix-section" id="matrix">
			<div class="section-header">
				<div>
					<h2 class="section-title">Design Skills Matrix</h2>
					<p class="section-subtitle">Cross-functional technical proficiency levels</p>
				</div>
				<span class="section-ref">REF: [DS_MATRIX_V4.0]</span>
			</div>

			<div class="matrix-content">
				<div class="matrix-table-wrapper">
					<table class="matrix-table">
						<thead>
							<tr>
								<th>Category</th>
								<th>Core Skill</th>
								<th>Proficiency</th>
							</tr>
						</thead>
						<tbody>
							{#each skillsData as item}
								<tr>
									<td>{item.category}</td>
									<td class="skill-name">{item.skill}</td>
									<td>
										<div class="proficiency-cell">
											<div class="proficiency-bar">
												<div class="proficiency-fill" style="width: {item.proficiency}%"></div>
											</div>
											<span class="proficiency-value">{item.proficiency}%</span>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="matrix-visual">
					<span class="visual-icon material-symbols-outlined">grid_view</span>
					<div class="visual-card">
						<h4>Architectural Approach</h4>
						<p>
							Design is not just visual; it's structural engineering for human interaction. Every
							component is audited for scalability and logic.
						</p>
					</div>
					<div class="visual-stats">
						<div class="stat-card">
							<span class="stat-value">18</span>
							<span class="stat-label">Years Exp</span>
						</div>
						<div class="stat-card accent">
							<span class="stat-value">50+</span>
							<span class="stat-label">Design Systems</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Methodology Section -->
		<section class="methodology-section" id="methodology">
			<div class="methodology-header">
				<h2 class="section-title">Methodology</h2>
				<div class="title-underline"></div>
			</div>

			<div class="methodology-grid">
				<div class="methodology-card">
					<span class="card-number">01</span>
					<span class="material-symbols-outlined card-icon">analytics</span>
					<h3>Analysis</h3>
					<p>
						Stakeholder interviews, user research audits, and technical constraint mapping to define
						the blueprint boundaries.
					</p>
					<ul>
						<li>User Persona Mapping</li>
						<li>Competitive Audit</li>
						<li>Tech Stack Alignment</li>
					</ul>
				</div>
				<div class="methodology-card active">
					<span class="card-number">02</span>
					<span class="material-symbols-outlined card-icon">architecture</span>
					<h3>Implementation</h3>
					<p>
						Constructing the design system, wireframing technical flows, and building high-fidelity
						interactive prototypes.
					</p>
					<ul>
						<li>Atomic Componentry</li>
						<li>Prototyping Logic</li>
						<li>Design Tokens</li>
					</ul>
				</div>
				<div class="methodology-card">
					<span class="card-number">03</span>
					<span class="material-symbols-outlined card-icon">verified_user</span>
					<h3>Verification</h3>
					<p>
						Usability testing, accessibility audits (WCAG), and engineering hand-off documentation
						to ensure build integrity.
					</p>
					<ul>
						<li>Accessibility Testing</li>
						<li>Dev Specification</li>
						<li>Performance Audit</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Work History Section -->
		<section class="history-section" id="experience">
			<h2 class="section-title">Work History</h2>
			<div class="history-list">
				{#each designerFocus?.experiences || [] as exp, index}
					<div class="history-item">
						<div class="history-period">
							<span class="period-dates">{exp.period.replace(' - ', ' — ')}</span>
							<span class="period-role">{exp.position}</span>
						</div>
						<div class="history-content">
							<h3>{exp.company}</h3>
							<p>{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Education Banner -->
		<section class="education-banner">
			<div class="banner-content">
				<span class="material-symbols-outlined banner-icon">terminal</span>
				<div>
					<h2>Technical Foundation</h2>
					<p>{cvData.education.degree} • Class of {cvData.education.year}</p>
				</div>
			</div>
			<div class="banner-decoration">
				<span>Verified Academic Record</span>
				<div class="banner-line"></div>
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.designer-container {
		display: flex;
		flex-direction: column;
	}

	/* Hero Section */
	.hero-section {
		padding: 4rem 0;
		position: relative;
	}

	.hero-label-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.label-line {
		width: 3rem;
		height: 1px;
		background: var(--color-primary);
	}

	.hero-label {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.3em;
	}

	.hero-title {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.03em;
		line-height: 0.95;
		margin: 0 0 2rem 0;
		color: var(--color-on-surface);
	}

	.hero-title .highlight {
		color: var(--color-primary);
	}

	.hero-description {
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 300;
		line-height: 1.6;
		color: var(--color-on-surface-variant);
		margin: 0 0 3rem 0;
		max-width: 48rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: flex-start;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.btn-primary:hover {
		transform: translateY(-0.25rem);
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	}

	.education-badge {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		border: 1px solid var(--color-primary);
		background: var(--color-surface);
	}

	.education-badge .material-symbols-outlined {
		font-size: 2rem;
		color: var(--color-primary);
	}

	.badge-label {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		opacity: 0.6;
		margin: 0;
	}

	.badge-value {
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0;
	}

	/* Section Header */
	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 3rem;
	}

	@media (min-width: 768px) {
		.section-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.section-subtitle {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		margin: 0.5rem 0 0 0;
	}

	.section-ref {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-on-surface-variant);
		opacity: 0.5;
	}

	/* Matrix Section */
	.matrix-section {
		padding: 3rem 0;
		background: var(--color-surface);
		border-top: 1px solid var(--color-outline-variant);
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.matrix-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.matrix-content {
			grid-template-columns: 1.5fr 1fr;
		}
	}

	.matrix-table-wrapper {
		overflow-x: auto;
	}

	.matrix-table {
		width: 100%;
		border-collapse: collapse;
	}

	.matrix-table th {
		padding: 1.5rem;
		text-align: left;
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--color-outline-variant);
		background: var(--color-primary-container);
	}

	.matrix-table td {
		padding: 1.5rem;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.matrix-table tr:hover td {
		background: var(--color-primary-container);
	}

	.skill-name {
		font-weight: 900;
		color: var(--color-primary);
		text-transform: uppercase;
	}

	.proficiency-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.proficiency-bar {
		flex: 1;
		height: 0.375rem;
		background: var(--color-primary-container);
		border-radius: 1rem;
		overflow: hidden;
	}

	.proficiency-fill {
		height: 100%;
		background: var(--color-primary);
		border-radius: 1rem;
	}

	.proficiency-value {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		min-width: 2.5rem;
	}

	.matrix-visual {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 2rem;
		border: 1px dashed var(--color-outline-variant);
		background: var(--color-primary-container);
	}

	.visual-icon {
		font-size: 10rem;
		color: var(--color-on-surface);
		opacity: 0.1;
		position: absolute;
	}

	.matrix-visual {
		position: relative;
		min-height: 300px;
		justify-content: center;
	}

	.visual-card {
		background: var(--color-surface);
		padding: 1.5rem;
		border: 1px solid var(--color-outline-variant);
	}

	.visual-card h4 {
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		color: var(--color-primary);
		margin: 0 0 0.5rem 0;
	}

	.visual-card p {
		font-size: 0.875rem;
		opacity: 0.7;
		margin: 0;
	}

	.visual-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.stat-card {
		padding: 1.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
		text-align: center;
	}

	.stat-card.accent {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 900;
	}

	.stat-label {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* Methodology Section */
	.methodology-section {
		padding: 4rem 0;
	}

	.methodology-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.title-underline {
		width: 4rem;
		height: 0.25rem;
		background: var(--color-primary);
		margin: 1rem auto 0;
	}

	.methodology-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
	}

	@media (min-width: 768px) {
		.methodology-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.methodology-card {
		padding: 3rem 2rem;
		border: 1px solid var(--color-outline-variant);
		text-align: center;
		position: relative;
	}

	@media (min-width: 768px) {
		.methodology-card {
			border-right: none;
		}

		.methodology-card:last-child {
			border-right: 1px solid var(--color-outline-variant);
		}
	}

	.methodology-card.active {
		background: var(--color-primary-container);
	}

	.card-number {
		position: absolute;
		top: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 5rem;
		font-weight: 900;
		opacity: 0.05;
		color: var(--color-primary);
	}

	.card-icon {
		font-size: 3rem;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.methodology-card h3 {
		font-size: 1.5rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 1rem 0;
		color: var(--color-on-surface);
	}

	.methodology-card p {
		font-size: 0.875rem;
		opacity: 0.7;
		margin: 0 0 1.5rem 0;
		max-width: 20rem;
		margin-inline: auto;
	}

	.methodology-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: left;
	}

	.methodology-card li {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.methodology-card li::before {
		content: '';
		width: 0.375rem;
		height: 0.375rem;
		background: var(--color-primary);
		border-radius: 50%;
	}

	/* History Section */
	.history-section {
		padding: 4rem 0;
		background: var(--color-surface);
		border-top: 1px solid var(--color-outline-variant);
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.history-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding-bottom: 3rem;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.history-item {
			grid-template-columns: 1fr 3fr;
			gap: 3rem;
		}
	}

	.history-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.period-dates {
		display: block;
		font-size: 1.25rem;
		font-weight: 900;
		color: var(--color-primary);
	}

	.period-role {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.5;
	}

	.history-content h3 {
		font-size: 1.5rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 1rem 0;
		color: var(--color-on-surface);
	}

	.history-content p {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	/* Education Banner */
	.education-banner {
		padding: 4rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.education-banner {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.banner-content {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.banner-icon {
		font-size: 4rem;
	}

	.banner-content h2 {
		font-size: 1.5rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0;
	}

	.banner-content p {
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.8;
		margin: 0.25rem 0 0 0;
	}

	.banner-decoration {
		text-align: right;
	}

	.banner-decoration span {
		font-size: 0.625rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.5;
		display: block;
		margin-bottom: 0.5rem;
	}

	.banner-line {
		width: 5rem;
		height: 0.125rem;
		background: var(--color-on-primary);
		margin-left: auto;
	}
</style>
