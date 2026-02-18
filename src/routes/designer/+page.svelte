<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';

	const cvData = loadCVData();
	const designerFocus = getFocusByName('designer');

	const designSkills = [
		{ name: 'Figma_Systems', level: 98 },
		{ name: 'Design_Architecture', level: 95 },
		{ name: 'Technical_Prototyping', level: 92 }
	];

	const navLinks = [
		{ label: '01. CORE_INDEX', href: '#' },
		{ label: '02. TIMELINE_DEPT', href: '#experience' },
		{ label: '03. TECH_SPECS', href: '#skills' }
	];
</script>

<div class="design-wrapper">
	<!-- Architectural Grid Overlays -->
	<div class="grid-overlay"></div>
	<div class="ruler-x"></div>
	<div class="ruler-y"></div>

	<!-- Top Navigation -->
	<header class="design-header">
		<div class="header-container">
			<div class="header-left">
				<div class="logo-box">
					<span class="material-symbols-outlined">architecture</span>
				</div>
				<div class="header-title">
					<h1>{cvData.personal.name}</h1>
					<p>SYSTEM_ARCHITECT.v2025</p>
				</div>
			</div>
			<nav class="header-nav">
				{#each navLinks as link}
					<a href={link.href} class="nav-link">
						<span class="nav-num">{link.label.split('.')[0]}</span>
						{link.label.split('. ')[1]}
					</a>
				{/each}
				<button class="export-btn">
					<span class="material-symbols-outlined">download</span>
					EXPORT_PDF
				</button>
			</nav>
		</div>
	</header>

	<main class="design-main">
		<div class="main-container">
			<!-- Hero Section -->
			<section class="hero-section">
				<div class="hero-content">
					<div class="status-badge">Current Status: Senior Design Consultant</div>
					<h2 class="hero-title">
						Engineering <span class="text-primary">Experiences.</span>
					</h2>
					<p class="hero-description">
						A Product Designer with <strong>18 years</strong> of specialized experience bridging the gap
						between high-level engineering and human-centric UI/UX. Expert in constructing scalable design
						systems and functional prototypes.
					</p>
					<div class="hero-cards">
						<div class="hero-card">
							<span class="material-symbols-outlined">token</span>
							<div>
								<p class="card-label">Design Authority</p>
								<p class="card-value">Figma & Systems</p>
							</div>
						</div>
						<div class="hero-card">
							<span class="material-symbols-outlined">terminal</span>
							<div>
								<p class="card-label">Engineering Bridge</p>
								<p class="card-value">UI Technical Lead</p>
							</div>
						</div>
					</div>
				</div>
				<div class="hero-image">
					<div class="image-frame"></div>
					<div class="image-ref">IMG_001_REF</div>
					<div class="image-container">
						<img
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs6oLpS7hl_pU5OVuwT5G3-daplDGUS9OM7LUYblAGbo_0sgxuwmZ35VqjrEzWzwQaEgxXK9nQ4EGJlSUD_nLxG0QgHrIasz5Sps7mXqkWndXzVjIU2cbiQMCTpjdZAEDopS_YmnKgHObr-Y8LUn3UEjUXOmjh9KMKxQj0FaL0mK6T2FIWYXMq-Q1jlcuItUBiUYPOTkNC9LfMtgRPQwkbAxomowo2a-6mYy8MIA5jtD31ubcc7TbGHHu_GgzxIYq1bkvt9tOQAJGs"
							alt="Professional portrait of Benito Anagua Ibarra"
						/>
					</div>
				</div>
			</section>

			<!-- Metadata Counters -->
			<section class="counters-section">
				<div class="counter-grid">
					<div class="counter-cell">
						<p class="counter-label">Total_Experience</p>
						<p class="counter-value">18<span class="counter-unit">YRS</span></p>
					</div>
					<div class="counter-cell">
						<p class="counter-label">Code_Integration</p>
						<p class="counter-value">100<span class="counter-unit">%</span></p>
					</div>
					<div class="counter-cell">
						<p class="counter-label">Design_Systems</p>
						<p class="counter-value">EXPERT</p>
					</div>
					<div class="counter-cell">
						<p class="counter-label">Prototypes_Built</p>
						<p class="counter-value">500+</p>
					</div>
				</div>
			</section>

			<!-- Experience Timeline -->
			<section class="experience-section" id="experience">
				<div class="section-header">
					<h3>02_EXPERIENCE_TIMELINE</h3>
					<div class="section-line"></div>
				</div>
				<div class="timeline">
					{#each designerFocus?.experiences || [] as exp, index}
						<div class="timeline-entry">
							<div class="timeline-dot" class:active={index === 0}></div>
							<div class="timeline-grid">
								<div class="timeline-date">
									<span class:active={index === 0}>{exp.period}</span>
								</div>
								<div class="timeline-content">
									<h4>{exp.company}</h4>
									<p class="position">{exp.position}</p>
									<p class="description">{exp.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Skills & Education -->
			<section class="skills-section" id="skills">
				<div class="skills-grid">
					<!-- Education -->
					<div class="education-column">
						<div class="section-header">
							<h3>03_EDUCATION</h3>
							<div class="section-line"></div>
						</div>
						<div class="education-box">
							<div class="education-header">
								<h4>{cvData.education.degree}</h4>
								<span class="year">{cvData.education.year}</span>
							</div>
							<p class="university">{cvData.education.university}</p>
							<div class="disciplines">
								<p class="disc-label">CORE_DISCIPLINES:</p>
								<ul class="disc-list">
									<li><span class="disc-dot"></span>Software Architecture</li>
									<li><span class="disc-dot"></span>Information Systems</li>
									<li><span class="disc-dot"></span>UI Algorithms</li>
									<li><span class="disc-dot"></span>Technical Analysis</li>
								</ul>
							</div>
						</div>
					</div>

					<!-- Tech Specs -->
					<div class="specs-column">
						<div class="section-header">
							<h3>04_TECH_SPECS</h3>
							<div class="section-line"></div>
						</div>
						<div class="specs-list">
							{#each designSkills as skill}
								<div class="spec-item">
									<div class="spec-header">
										<span class="spec-name">{skill.name}</span>
										<span class="spec-level">{skill.level}%</span>
									</div>
									<div class="spec-bar">
										<div class="spec-fill" style="width: {skill.level}%"></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</section>

			<!-- Final CTA -->
			<section class="cta-section">
				<div class="cta-icon">
					<span class="material-symbols-outlined">contact_page</span>
				</div>
				<h3>Ready to <span class="text-primary">Build?</span></h3>
				<p>
					Now accepting specialized consultations for design system architecture and
					high-performance product UI.
				</p>
				<div class="cta-buttons">
					<button class="cta-primary">INIT_PROTOCOL</button>
					<button class="cta-secondary">LINKEDIN_CONNECT</button>
				</div>
			</section>
		</div>
	</main>

	<!-- Footer -->
	<footer class="design-footer">
		<div class="footer-container">
			<p>© {new Date().getFullYear()} {cvData.personal.name} // Architectural UI/UX</p>
			<div class="footer-meta">
				<span>LAT: -21.5333</span>
				<span>LONG: -64.7333</span>
				<span class="text-primary">BUILD_STABLE: V1.0.4</span>
			</div>
		</div>
	</footer>
</div>

<style>
	.design-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--color-background);
		position: relative;
		overflow-x: hidden;
	}

	/* Grid Overlay */
	.grid-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: radial-gradient(
			circle,
			color-mix(in srgb, var(--color-primary) 10%, transparent) 1px,
			transparent 1px
		);
		background-size: 32px 32px;
		pointer-events: none;
		z-index: 0;
		opacity: 0.3;
	}

	/* Rulers */
	.ruler-x {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2rem;
		background-image: linear-gradient(
			90deg,
			color-mix(in srgb, var(--color-primary) 20%, transparent) 1px,
			transparent 1px
		);
		background-size: 64px 100%;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
		z-index: 0;
		opacity: 0.2;
	}

	.ruler-y {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 2rem;
		background-image: linear-gradient(
			180deg,
			color-mix(in srgb, var(--color-primary) 20%, transparent) 1px,
			transparent 1px
		);
		background-size: 100% 64px;
		border-right: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
		z-index: 0;
		opacity: 0.2;
	}

	/* Header */
	.design-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--color-surface-container) 80%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		padding: 1rem 2rem;
	}

	@media (min-width: 1024px) {
		.design-header {
			padding: 1rem 5rem;
		}
	}

	.header-container {
		max-width: 80rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo-box {
		padding: 0.5rem;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
	}

	.logo-box .material-symbols-outlined {
		font-size: 1.5rem;
	}

	.header-title h1 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-on-surface);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		font-family: var(--font-mono);
	}

	.header-title p {
		font-size: 0.625rem;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		font-family: var(--font-mono);
		letter-spacing: 0.2em;
		margin: 0;
	}

	.header-nav {
		display: none;
		align-items: center;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.header-nav {
			display: flex;
		}
	}

	.nav-link {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--color-primary) 80%, transparent);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-num {
		opacity: 0.4;
	}

	.export-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		padding: 0.5rem 1rem;
		font-weight: 700;
		font-size: 0.75rem;
		border: none;
		border-radius: 2px;
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.export-btn:hover {
		background: var(--color-inverse-surface);
	}

	.export-btn .material-symbols-outlined {
		font-size: 1rem;
	}

	/* Main */
	.design-main {
		flex: 1;
		padding: 3rem 2rem;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 1024px) {
		.design-main {
			padding: 3rem 5rem;
		}
	}

	.main-container {
		max-width: 80rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 6rem;
	}

	/* Hero Section */
	.hero-section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: start;
	}

	@media (min-width: 1024px) {
		.hero-section {
			grid-template-columns: 1.5fr 1fr;
		}
	}

	.status-badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		background: color-mix(in srgb, var(--color-primary) 5%, transparent);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 1.5rem;
	}

	.hero-title {
		font-size: clamp(3rem, 8vw, 5rem);
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		letter-spacing: 0.025em;
		line-height: 1;
		margin: 0;
		font-style: italic;
	}

	.hero-title .text-primary {
		font-style: normal;
	}

	.hero-description {
		font-size: 1.125rem;
		color: color-mix(in srgb, var(--color-primary) 70%, transparent);
		font-weight: 300;
		line-height: 1.6;
		max-width: 42rem;
		margin: 1.5rem 0 0 0;
	}

	.hero-description strong {
		color: var(--color-on-surface);
		font-weight: 600;
	}

	.hero-cards {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2rem;
	}

	.hero-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--color-surface-container);
		border: 1px solid var(--color-outline-variant);
		border-radius: 4px;
	}

	.hero-card .material-symbols-outlined {
		font-size: 1.75rem;
		color: var(--color-primary);
	}

	.card-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
	}

	.card-value {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0;
	}

	/* Hero Image */
	.hero-image {
		position: relative;
		display: none;
	}

	@media (min-width: 768px) {
		.hero-image {
			display: block;
		}
	}

	.image-frame {
		position: absolute;
		inset: -8px;
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		transform: scale(0.95);
		transition: transform 0.5s ease;
	}

	.hero-image:hover .image-frame {
		transform: scale(1);
	}

	.image-ref {
		position: absolute;
		top: -1rem;
		right: -1rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-primary);
		transform: rotate(90deg);
		transform-origin: left;
	}

	.image-container {
		aspect-ratio: 1 / 1;
		background: var(--color-surface-container);
		border: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		overflow: hidden;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		mix-blend-mode: luminosity;
		transition: mix-blend-mode 0.5s ease;
	}

	.image-container:hover img {
		mix-blend-mode: normal;
	}

	/* Counters */
	.counters-section {
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.counter-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 768px) {
		.counter-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.counter-cell {
		padding: 2rem;
		background: var(--color-surface);
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.counter-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 0.5rem 0;
	}

	.counter-value {
		font-size: 2.5rem;
		font-weight: 900;
		color: var(--color-primary);
		margin: 0;
		line-height: 1;
	}

	.counter-unit {
		font-size: 1rem;
		font-weight: 400;
	}

	/* Section Headers */
	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.section-header h3 {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.3em;
		margin: 0;
		white-space: nowrap;
	}

	.section-line {
		height: 1px;
		background: color-mix(in srgb, var(--color-primary) 20%, transparent);
		flex: 1;
	}

	/* Timeline */
	.experience-section .timeline {
		position: relative;
		border-left: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		margin-left: 1rem;
		padding-left: 3rem;
	}

	.timeline-entry {
		position: relative;
		padding-bottom: 4rem;
	}

	.timeline-entry:last-child {
		padding-bottom: 0;
	}

	.timeline-dot {
		position: absolute;
		left: -3.5rem;
		top: 0;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		border: 2px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		background: var(--color-surface);
	}

	.timeline-dot.active {
		border-color: var(--color-primary);
		background: var(--color-primary);
	}

	.timeline-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 1024px) {
		.timeline-grid {
			grid-template-columns: 200px 1fr;
		}
	}

	.timeline-date span {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-outline-variant);
		color: var(--color-on-surface-variant);
		display: inline-block;
	}

	.timeline-date span.active {
		background: var(--color-primary-container);
		border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
		color: var(--color-primary);
		font-weight: 700;
	}

	.timeline-content h4 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-on-surface);
		text-transform: uppercase;
		margin: 0 0 0.25rem 0;
	}

	.timeline-content .position {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
	}

	.timeline-content .description {
		color: var(--color-on-surface-variant);
		font-size: 0.875rem;
		line-height: 1.6;
		max-width: 42rem;
		margin: 0;
	}

	/* Skills Section */
	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
	}

	@media (min-width: 1024px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.education-box {
		padding: 2rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		background: var(--color-primary-container);
	}

	.education-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.education-header h4 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-on-surface);
		text-transform: uppercase;
		margin: 0;
		max-width: 18rem;
		line-height: 1.2;
	}

	.education-box .year {
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.875rem;
	}

	.education-box .university {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		margin: 0.5rem 0 0 0;
	}

	.disciplines {
		padding-top: 1rem;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
		margin-top: 1rem;
	}

	.disc-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		margin: 0 0 0.5rem 0;
	}

	.disc-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.disc-list li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
	}

	.disc-dot {
		width: 4px;
		height: 4px;
		background: var(--color-primary);
	}

	/* Specs */
	.specs-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.spec-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.spec-header {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.spec-name {
		color: var(--color-on-surface);
	}

	.spec-level {
		color: var(--color-primary);
	}

	.spec-bar {
		height: 8px;
		background: var(--color-surface-container);
		border: 1px solid var(--color-outline-variant);
		overflow: hidden;
	}

	.spec-fill {
		height: 100%;
		background: var(--color-primary);
	}

	/* CTA Section */
	.cta-section {
		text-align: center;
		padding: 5rem 0;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.cta-icon {
		position: relative;
		display: inline-block;
		margin-bottom: 2rem;
	}

	.cta-icon::before {
		content: '';
		position: absolute;
		inset: -2.5rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
	}

	.cta-icon .material-symbols-outlined {
		font-size: 3.5rem;
		color: var(--color-primary);
	}

	.cta-section h3 {
		font-size: 2.5rem;
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		font-style: italic;
		margin: 0 0 1rem 0;
	}

	.cta-section h3 .text-primary {
		font-style: normal;
	}

	.cta-section > p {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		max-width: 28rem;
		margin: 0 auto 2rem;
	}

	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}

	.cta-primary {
		padding: 0.75rem 2rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.875rem;
		border: none;
		border-radius: 2px;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.cta-primary:hover {
		transform: scale(1.05);
	}

	.cta-secondary {
		padding: 0.75rem 2rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		color: var(--color-primary);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.875rem;
		background: transparent;
		border-radius: 2px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.cta-secondary:hover {
		background: var(--color-primary-container);
	}

	/* Footer */
	.design-footer {
		background: var(--color-surface);
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
		padding: 2rem;
	}

	@media (min-width: 1024px) {
		.design-footer {
			padding: 2rem 5rem;
		}
	}

	.footer-container {
		max-width: 80rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	@media (min-width: 768px) {
		.footer-container {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.footer-meta {
		display: flex;
		gap: 2rem;
	}

	.text-primary {
		color: var(--color-primary);
	}
</style>
