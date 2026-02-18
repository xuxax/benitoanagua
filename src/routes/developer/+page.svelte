<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';

	const cvData = loadCVData();
	const developerFocus = getFocusByName('developer');

	const techStack = [
		{ name: 'Svelte / SvelteKit', level: 98, label: 'CORE_98%' },
		{ name: 'C# / .NET Core', level: 95, label: 'CORE_95%' },
		{ name: 'Vue.js Ecosystem', level: 90, label: 'STABLE_90%' },
		{ name: 'Blazor / WebAssembly', level: 88, label: 'STABLE_88%' }
	];

	const primaryEngines = ['SVELTE', 'VUE', '.NET', 'C#'];
</script>

<div class="blueprint-wrapper">
	<!-- Header / Identity System -->
	<header class="blueprint-header">
		<div class="header-container">
			<div class="header-left">
				<div class="identity-logo">
					<span class="material-symbols-outlined">architecture</span>
					<div class="corner-dot top-left"></div>
					<div class="corner-dot bottom-right"></div>
				</div>
				<div class="identity-title">
					<h1>{cvData.personal.name}</h1>
					<p>Full_Stack_Architect <span class="text-primary">//</span> V18.0_EXPERIENCE</p>
				</div>
			</div>
			<div class="header-right">
				<div class="status-badge">
					<span class="status-label">STATUS:</span>
					<span class="status-value">ACTIVE_SYSTEM</span>
				</div>
				<div class="status-badge">
					<span class="status-label">LOC:</span>
					<span class="status-value">TAR_BOL</span>
				</div>
				<button class="download-btn">
					<span class="material-symbols-outlined">download</span>
					GENERATE_REPORT_PDF
				</button>
			</div>
		</div>
	</header>

	<main class="blueprint-main">
		<div class="main-container">
			<div class="content-grid">
				<!-- Left Column: Specs & Core -->
				<aside class="left-column">
					<!-- System Metadata -->
					<section class="spec-section">
						<h2 class="section-title">
							<span class="section-dot"></span>
							SECTION_00 <span class="text-primary">//</span> SYSTEM_CORE
						</h2>
						<div class="metadata-grid">
							<div class="metadata-cell">
								<p class="metadata-label">Uptime_Years</p>
								<p class="metadata-value">18+</p>
							</div>
							<div class="metadata-cell">
								<p class="metadata-label">Architecture</p>
								<p class="metadata-value">FULLSTACK</p>
							</div>
							<div class="metadata-cell full-width">
								<p class="metadata-label">Primary_Engine</p>
								<div class="engine-tags">
									{#each primaryEngines as engine}
										<span class="engine-tag">{engine}</span>
									{/each}
								</div>
							</div>
						</div>
					</section>

					<!-- Technical Stack Matrix -->
					<section class="spec-section">
						<h2 class="section-title">
							<span class="section-dot"></span>
							SECTION_01 <span class="text-primary">//</span> TECH_STACK
						</h2>
						<div class="tech-stack">
							{#each techStack as tech}
								<div class="tech-item group">
									<div class="tech-header">
										<span class="tech-name">{tech.name}</span>
										<span class="tech-level">{tech.label}</span>
									</div>
									<div class="tech-bar">
										<div class="tech-fill" style="width: {tech.level}%"></div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Certification -->
					<section class="spec-section">
						<h2 class="section-title">
							<span class="section-dot"></span>
							SECTION_02 <span class="text-primary">//</span> CERTIFICATION
						</h2>
						<div class="certification-box">
							<p class="cert-date">Graduation_Date: {cvData.education.year}</p>
							<p class="cert-degree">{cvData.education.degree}</p>
							<p class="cert-university">{cvData.education.university}</p>
						</div>
					</section>
				</aside>

				<!-- Right Column: Timeline Log -->
				<div class="right-column">
					<h2 class="section-title">
						<span class="section-dot"></span>
						SECTION_03 <span class="text-primary">//</span> CHRONOLOGICAL_LOG
					</h2>
					<div class="timeline">
						{#each developerFocus?.experiences || [] as experience, index}
							<div class="timeline-entry group">
								<div class="timeline-dot" class:active={index === 0}></div>
								<div class="timeline-content">
									<div class="timeline-header">
										<span class="timeline-period" class:active={index === 0}
											>{experience.period}</span
										>
										<h3 class="timeline-company">{experience.company}</h3>
									</div>
									<div class="timeline-description">
										<p>{experience.description}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Technical Footer -->
	<footer class="blueprint-footer">
		<div class="footer-container">
			<div class="footer-output">
				<div class="output-header">
					<span class="material-symbols-outlined">terminal</span>
					<span class="output-title">SYSTEM_OUTPUT</span>
				</div>
				<p class="output-text">
					This document is a technical architectural report for {cvData.personal.name}. Generated on
					system timestamp {new Date().toISOString().split('T')[0].replace(/-/g, '.')}.
				</p>
			</div>
			<div class="footer-meta">
				<div class="meta-group">
					<p class="meta-label">Data_Integrity</p>
					<ul class="meta-list">
						<li>SHA-256: 9e32f...a12</li>
						<li>ENCRYPT: RSA_4096</li>
						<li>STATUS: VERIFIED</li>
					</ul>
				</div>
				<div class="meta-group">
					<p class="meta-label">Contact_Protocol</p>
					<ul class="meta-list">
						<li>METHOD: TCP_IP</li>
						<li>PORT: 8080</li>
						<li>SIGNAL: AVAILABLE</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p>© {new Date().getFullYear()} BAI_ARCHITECTURAL_OUTLINE</p>
			<div class="footer-links">
				<button type="button">Privacy_Policy</button>
				<button type="button">System_Logs</button>
			</div>
		</div>
	</footer>

	<!-- Floating UI Elements -->
	<div class="floating-actions">
		<button class="floating-btn" aria-label="Settings">
			<span class="material-symbols-outlined">settings</span>
		</button>
		<button class="floating-btn" aria-label="Scroll to top">
			<span class="material-symbols-outlined">expand_less</span>
		</button>
	</div>
</div>

<style>
	.blueprint-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--color-background);
		position: relative;
	}

	/* Blueprint Grid Background */
	.blueprint-wrapper::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: var(--blueprint-grid);
		background-size: 30px 30px;
		pointer-events: none;
		z-index: 0;
	}

	/* Header */
	.blueprint-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--color-surface-container);
		backdrop-filter: blur(12px);
		border-bottom: var(--hairline-border);
		padding: 1rem 1.5rem;
	}

	@media (min-width: 768px) {
		.blueprint-header {
			padding: 1rem 3rem;
		}
	}

	.header-container {
		max-width: 80rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.header-container {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.identity-logo {
		position: relative;
		width: 4rem;
		height: 4rem;
		border: 1px solid var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-container);
	}

	.identity-logo .material-symbols-outlined {
		font-size: 2.5rem;
		color: var(--color-primary);
	}

	.corner-dot {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--color-primary);
	}

	.corner-dot.top-left {
		top: -4px;
		left: -4px;
	}

	.corner-dot.bottom-right {
		bottom: -4px;
		right: -4px;
	}

	.identity-title h1 {
		font-size: 1.5rem;
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		line-height: 1;
	}

	.identity-title p {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0.5rem 0 0 0;
	}

	.header-right {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.status-badge {
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-primary-container);
		border-radius: 2px;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		display: flex;
		gap: 0.25rem;
	}

	.status-label {
		color: var(--color-on-surface-variant);
	}

	.status-value {
		color: var(--color-primary);
	}

	.download-btn {
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
		transition: background 0.2s ease;
	}

	.download-btn:hover {
		background: var(--color-primary-container);
	}

	.download-btn .material-symbols-outlined {
		font-size: 1rem;
	}

	/* Main Content */
	.blueprint-main {
		flex: 1;
		padding: 3rem 1.5rem;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 768px) {
		.blueprint-main {
			padding: 3rem 3rem;
		}
	}

	.main-container {
		max-width: 80rem;
		margin: 0 auto;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 1024px) {
		.content-grid {
			grid-template-columns: 330px 1fr;
		}
	}

	.section-title {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-primary);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.section-dot {
		width: 6px;
		height: 6px;
		background: var(--stroke-primary);
		border-radius: 50%;
	}

	/* Left Column */
	.left-column {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.spec-section {
		background: var(--color-surface-container);
		padding: 1.5rem;
		border: var(--hairline-border);
	}

	.metadata-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background: var(--color-outline-variant);
		border: var(--hairline-border);
	}

	.metadata-cell {
		background: var(--color-surface);
		padding: 1rem;
	}

	.metadata-cell.full-width {
		grid-column: span 2;
	}

	.metadata-label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 0.25rem 0;
	}

	.metadata-value {
		font-size: 1.5rem;
		font-weight: 900;
		color: var(--color-on-surface);
		font-style: italic;
		margin: 0;
	}

	.engine-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.engine-tag {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		padding: 0.125rem 0.5rem;
		background: var(--color-primary-container);
		color: var(--color-primary);
		border: 1px solid var(--color-outline-variant);
	}

	/* Tech Stack */
	.tech-stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: var(--font-mono);
	}

	.tech-item {
		border-left: 2px solid var(--color-outline-variant);
		padding-left: 1rem;
		transition: border-color 0.3s ease;
	}

	.tech-item:hover {
		border-color: var(--color-primary);
	}

	.tech-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 0.25rem;
	}

	.tech-name {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-on-surface);
		letter-spacing: 0.025em;
	}

	.tech-level {
		font-size: 0.625rem;
		color: var(--color-primary);
	}

	.tech-bar {
		width: 100%;
		background: var(--color-surface-variant);
		height: 4px;
	}

	.tech-fill {
		height: 100%;
		background: var(--color-primary);
		box-shadow: 0 0 8px color-mix(in srgb, var(--color-primary) 50%, transparent);
	}

	/* Certification */
	.certification-box {
		padding: 1rem;
		border: 1px dashed var(--color-outline-variant);
		background: var(--color-primary-container);
		border-radius: 2px;
	}

	.cert-date {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-primary);
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
	}

	.cert-degree {
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0 0 0.25rem 0;
		font-size: 0.875rem;
	}

	.cert-university {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	/* Right Column - Timeline */
	.right-column {
		padding-top: 0;
	}

	.timeline {
		position: relative;
		border-left: 1px solid var(--color-outline-variant);
		margin-left: 0.5rem;
		padding-left: 2rem;
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
		left: -2rem;
		top: 0;
		width: 12px;
		height: 12px;
		background: var(--color-surface);
		border: 2px solid var(--color-outline-variant);
		border-radius: 50%;
		transition:
			border-color 0.3s ease,
			transform 0.3s ease;
	}

	.timeline-entry:hover .timeline-dot {
		border-color: var(--color-primary);
	}

	.timeline-dot.active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		transform: scale(1.25);
	}

	.timeline-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		.timeline-header {
			flex-direction: row;
			align-items: center;
		}
	}

	.timeline-period {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 0.125rem 0.5rem;
		background: var(--color-surface-container);
		color: var(--color-on-surface-variant);
		border-radius: 2px;
		width: fit-content;
	}

	.timeline-period.active {
		background: var(--color-primary-container);
		color: var(--color-primary);
	}

	.timeline-company {
		font-size: 1.25rem;
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		font-style: italic;
		letter-spacing: 0.025em;
		margin: 0;
	}

	.timeline-description {
		background: var(--color-surface-container);
		padding: 1.5rem;
		border: 1px solid var(--color-outline-variant);
		border-radius: 4px;
		transition: border-color 0.3s ease;
	}

	.timeline-entry:hover .timeline-description {
		border-color: var(--color-primary);
	}

	.timeline-description p {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		line-height: 1.6;
		margin: 0;
	}

	/* Footer */
	.blueprint-footer {
		border-top: var(--hairline-border);
		background: var(--color-surface);
		padding: 3rem 1.5rem;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 768px) {
		.blueprint-footer {
			padding: 3rem 3rem;
		}
	}

	.footer-container {
		max-width: 80rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.footer-container {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.footer-output {
		font-family: var(--font-mono);
		max-width: 300px;
	}

	.output-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-primary);
		margin-bottom: 0.5rem;
	}

	.output-header .material-symbols-outlined {
		font-size: 1rem;
	}

	.output-title {
		font-size: 0.75rem;
		font-weight: 700;
	}

	.output-text {
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		line-height: 1.6;
		margin: 0;
	}

	.footer-meta {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
		font-family: var(--font-mono);
	}

	.meta-label {
		font-size: 0.625rem;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		margin: 0 0 1rem 0;
	}

	.meta-list {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.footer-bottom {
		max-width: 80rem;
		margin: 3rem auto 0;
		padding-top: 2rem;
		border-top: 1px solid var(--color-outline-variant);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
	}

	@media (min-width: 768px) {
		.footer-bottom {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.footer-links {
		display: flex;
		gap: 1rem;
	}

	.footer-links button {
		color: var(--color-on-surface-variant);
		background: none;
		border: none;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.footer-links button:hover {
		color: var(--color-primary);
	}

	/* Floating Actions */
	.floating-actions {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.floating-btn {
		width: 2.5rem;
		height: 2.5rem;
		border: var(--hairline-border);
		background: var(--color-surface-container);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--color-primary);
		transition: background 0.2s ease;
	}

	.floating-btn:hover {
		background: var(--color-primary-container);
	}

	.floating-btn .material-symbols-outlined {
		font-size: 1.25rem;
	}

	.text-primary {
		color: var(--color-primary);
	}
</style>
