<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';

	const cvData = loadCVData();
	const graphicFocus = getFocusByName('graphic');

	const techSpecs = [
		{
			name: 'Adobe Creative Suite',
			level: 100,
			label: 'EXPERT_100%',
			detail: 'Ps, Ai, Id, Br, Acrobat Pro'
		},
		{
			name: 'Offset Printing',
			level: 95,
			label: 'ADVANCED_95%',
			detail: 'Pre-press, CMYK separation, Plates'
		},
		{
			name: 'Serigraphy & Screen',
			level: 90,
			label: 'INDUSTRIAL_90%',
			detail: 'Mesh selection, Emulsion, Pigments'
		},
		{
			name: 'Branding & Identity',
			level: 98,
			label: 'STRATEGIC_98%',
			detail: 'Logotypes, Manuals, Architectural Outline'
		}
	];

	const portfolioKey = '#B-A-I_2025';
</script>

<div class="graphic-wrapper">
	<!-- Background Grid -->
	<div class="grid-bg"></div>

	<!-- Main Blueprint Container -->
	<div class="blueprint-container">
		<!-- Crop Marks -->
		<div class="crop-mark top-left"></div>
		<div class="crop-mark top-right"></div>
		<div class="crop-mark bottom-left"></div>
		<div class="crop-mark bottom-right"></div>

		<!-- Header Section -->
		<header class="blueprint-header">
			<div class="header-main">
				<div class="header-intro">
					<div class="intro-label">
						<span>Architectural Profile</span>
						<span class="intro-line"></span>
					</div>
					<h1 class="monumental-name">
						Benito<br />Anagua<br />Ibarra
					</h1>
					<div class="intro-meta">
						<div class="meta-item">
							<span class="meta-label">Position</span>
							<span class="meta-value">Graphic Designer</span>
						</div>
						<div class="meta-item">
							<span class="meta-label">Experience</span>
							<span class="meta-value">18 Years Prof.</span>
						</div>
						<div class="meta-item">
							<span class="meta-label">Status</span>
							<span class="meta-value active">Active_Freelance</span>
						</div>
					</div>
				</div>
			</div>
			<div class="header-side">
				<div class="portrait-box">
					<img
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nVt0x-vbFrKiOkLwd-9I5UltNiUNedeCbVu8ZA1PAd66u-82qw3pP6MPJl8fLsVqcjLHkx9BLvoRIBA8j3FbDgLv_JNxAsMsgv_lXFlZR_TZUV1z_Hg-S6eOWDSKV6NxiSDIiwtQiwwzaeAHFzQ00ulfKXz1oHBY7uWSuW-QB4DFEr0u6NZcvGomIhzz93P6oRcdoIH6sPgxyyC_oB_ubg4nHgJNYHAZIJjr4Sq2swDP-eTiieQH_6dW0WcIw1dMnDrXaBH0mlKM"
						alt="Portrait of Benito Anagua Ibarra"
					/>
				</div>
				<div class="contact-info">
					<p class="contact-item">
						<span class="material-symbols-outlined">location_on</span>
						Location: Bolivia / Remote
					</p>
					<p class="contact-item">
						<span class="material-symbols-outlined">mail</span>
						benito.anagua@gmail.com
					</p>
				</div>
				<div class="action-buttons">
					<button class="btn-primary">
						<span class="material-symbols-outlined">download</span>
						Download Full CV_PDF
					</button>
					<button class="btn-secondary">
						<span class="material-symbols-outlined">share</span>
						Share Specification
					</button>
				</div>
			</div>
		</header>

		<!-- Main Content Grid -->
		<div class="content-grid">
			<!-- Left Column: Specs & Skills -->
			<aside class="left-column">
				<!-- Technical Specs -->
				<section class="specs-section">
					<h3 class="section-title">Technical Specifications</h3>
					<div class="specs-list">
						{#each techSpecs as spec}
							<div class="spec-item group">
								<div class="spec-header">
									<span class="spec-name">{spec.name}</span>
									<span class="spec-level">{spec.label}</span>
								</div>
								<div class="spec-bar">
									<div class="spec-fill" style="width: {spec.level}%"></div>
								</div>
								<p class="spec-detail">{spec.detail}</p>
							</div>
						{/each}
					</div>
				</section>

				<!-- Education Block -->
				<section class="education-section">
					<h3 class="section-title">Academic Foundation</h3>
					<div class="education-box">
						<p class="degree">{cvData.education.degree}</p>
						<p class="university">
							{cvData.education.university} / Graduation: {cvData.education.year}
						</p>
						<div class="quote-block">
							<p>
								"The technical precision of engineering applied to the architectural structure of
								visual design."
							</p>
						</div>
					</div>
				</section>

				<!-- Visual Assets -->
				<section class="assets-section">
					<div class="asset-grid">
						<div class="asset-box">
							<div class="asset-image"></div>
						</div>
						<div class="asset-box">
							<div class="asset-image"></div>
						</div>
					</div>
					<div class="portfolio-key">
						Portfolio Access Key: {portfolioKey}
					</div>
				</section>
			</aside>

			<!-- Right Column: Experience -->
			<main class="right-column">
				<h3 class="section-title">
					Professional Timeline
					<span class="title-line"></span>
				</h3>

				<div class="timeline">
					<div class="timeline-beam"></div>
					{#each graphicFocus?.experiences || [] as exp, index}
						<div class="timeline-entry group">
							<div class="entry-dot">
								<div class="dot-inner"></div>
							</div>
							<div class="entry-header">
								<h4>{exp.company}</h4>
								<span class="entry-period" class:current={index === 0}>{exp.period}</span>
							</div>
							<p class="entry-position">{exp.position}</p>
							<p class="entry-description">{exp.description}</p>
						</div>
					{/each}
				</div>

				<!-- Philosophy Footer -->
				<section class="philosophy-section">
					<div class="philosophy-content">
						<h5>Design Philosophy</h5>
						<p>
							<strong>Architectural Outline:</strong> Every design is a structure. I treat visual elements
							as physical load-bearing components, ensuring that every brand identity or print project
							has a solid technical foundation before aesthetic application.
						</p>
					</div>
					<div class="philosophy-signature">
						<span>System Integrity Checked // {new Date().getFullYear()}</span>
						<span class="signature">Benito Anagua Ibarra © All Rights Reserved</span>
					</div>
				</section>
			</main>
		</div>
	</div>

	<!-- Technical Metadata Footer -->
	<footer class="meta-footer">
		<div class="meta-items">
			<span>DPI_VAR: 300-2400</span>
			<span>COLOR_SPACE: CMYK/RGB</span>
			<span>GRID_UNIT: 40px</span>
		</div>
		<div class="meta-items">
			<span>LAT: -21.5353</span>
			<span>LONG: -64.7297</span>
			<span>DOC_TYPE: TECH_RESUME_V1</span>
		</div>
	</footer>
</div>

<style>
	.graphic-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background: var(--color-background);
		position: relative;
	}

	@media (min-width: 768px) {
		.graphic-wrapper {
			padding: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.graphic-wrapper {
			padding: 3rem;
		}
	}

	/* Grid Background */
	.grid-bg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image:
			linear-gradient(
				to right,
				color-mix(in srgb, var(--color-primary) 5%, transparent) 1px,
				transparent 1px
			),
			linear-gradient(
				to bottom,
				color-mix(in srgb, var(--color-primary) 5%, transparent) 1px,
				transparent 1px
			);
		background-size: 40px 40px;
		pointer-events: none;
		opacity: 0.5;
	}

	/* Blueprint Container */
	.blueprint-container {
		width: 100%;
		max-width: 72rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		background: color-mix(in srgb, var(--color-surface-container) 80%, transparent);
		backdrop-filter: blur(4px);
		position: relative;
		overflow: hidden;
	}

	/* Crop Marks */
	.crop-mark {
		position: absolute;
		width: 20px;
		height: 20px;
		border-color: var(--color-primary);
		z-index: 10;
	}

	.crop-mark.top-left {
		top: 0;
		left: 0;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		border-left: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		transform: translate(-8px, -8px);
	}

	.crop-mark.top-right {
		top: 0;
		right: 0;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		border-right: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		transform: translate(8px, -8px);
	}

	.crop-mark.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		border-left: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		transform: translate(-8px, 8px);
	}

	.crop-mark.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		border-right: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		transform: translate(8px, 8px);
	}

	/* Header */
	.blueprint-header {
		display: grid;
		grid-template-columns: 1fr;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
	}

	@media (min-width: 768px) {
		.blueprint-header {
			grid-template-columns: 2fr 1fr;
		}
	}

	.header-main {
		padding: 2rem;
		border-right: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
	}

	@media (min-width: 768px) {
		.header-main {
			padding: 2rem;
		}
	}

	.intro-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.intro-label span {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.intro-line {
		height: 1px;
		background: color-mix(in srgb, var(--color-primary) 20%, transparent);
		flex: 1;
	}

	.monumental-name {
		font-size: clamp(3rem, 10vw, 6rem);
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		letter-spacing: -0.05em;
		line-height: 0.85;
		margin: 0;
	}

	.intro-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
	}

	.meta-label {
		font-size: 0.625rem;
		font-weight: 700;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.meta-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-on-surface);
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.meta-value.active {
		color: var(--color-primary);
	}

	/* Header Side */
	.header-side {
		padding: 2rem;
		background: var(--color-primary-container);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.portrait-box {
		width: 8rem;
		height: 8rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		padding: 4px;
		background: var(--color-surface);
	}

	.portrait-box img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%) contrast(1.25);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--color-primary) 80%, transparent);
		margin: 0;
	}

	.contact-item .material-symbols-outlined {
		font-size: 1rem;
	}

	.action-buttons {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.btn-primary,
	.btn-secondary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: 2px;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.btn-primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border: none;
	}

	.btn-primary:hover {
		background: var(--color-inverse-surface);
	}

	.btn-secondary {
		background: transparent;
		color: var(--color-primary);
		border: 1px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
	}

	.btn-secondary:hover {
		background: var(--color-primary-container);
	}

	.btn-primary .material-symbols-outlined,
	.btn-secondary .material-symbols-outlined {
		font-size: 1rem;
	}

	/* Content Grid */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		.content-grid {
			grid-template-columns: 300px 1fr;
		}
	}

	/* Left Column */
	.left-column {
		padding: 2rem;
		border-right: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 900;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0 0 1.5rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
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
		gap: 0.25rem;
	}

	.spec-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.spec-name {
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.spec-level {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-primary);
	}

	.spec-bar {
		height: 4px;
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
	}

	.spec-fill {
		height: 100%;
		background: var(--color-primary);
		box-shadow: 0 0 8px color-mix(in srgb, var(--color-primary) 50%, transparent);
	}

	.spec-detail {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		margin: 0.25rem 0 0 0;
	}

	/* Education */
	.education-box {
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		padding: 1rem;
		background: var(--color-primary-container);
	}

	.degree {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-on-surface);
		text-transform: uppercase;
		margin: 0;
	}

	.university {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: color-mix(in srgb, var(--color-primary) 70%, transparent);
		margin: 0.25rem 0 0 0;
	}

	.quote-block {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.quote-block p {
		font-size: 0.6875rem;
		color: var(--color-on-surface-variant);
		font-style: italic;
		line-height: 1.5;
		margin: 0;
	}

	/* Assets */
	.asset-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.asset-box {
		aspect-ratio: 1 / 1;
		background: var(--color-surface-container);
		border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		padding: 0.5rem;
		filter: grayscale(100%);
		transition: filter 0.3s ease;
		cursor: crosshair;
	}

	.asset-box:hover {
		filter: grayscale(0);
	}

	.asset-image {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
	}

	.portfolio-key {
		background: color-mix(in srgb, var(--color-primary) 20%, transparent);
		padding: 1rem;
		text-align: center;
		font-size: 0.625rem;
		font-weight: 900;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 1rem;
	}

	/* Right Column */
	.right-column {
		padding: 2rem;
	}

	@media (min-width: 768px) {
		.right-column {
			padding: 3rem;
		}
	}

	.right-column .section-title {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.title-line {
		height: 1px;
		background: color-mix(in srgb, var(--color-primary) 30%, transparent);
		flex: 1;
	}

	/* Timeline */
	.timeline {
		position: relative;
		padding-left: 1rem;
	}

	.timeline-beam {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 1px;
		background: color-mix(in srgb, var(--color-primary) 20%, transparent);
		margin-left: 7px;
	}

	.timeline-entry {
		position: relative;
		padding-bottom: 3rem;
	}

	.timeline-entry:last-child {
		padding-bottom: 0;
	}

	.entry-dot {
		position: absolute;
		left: -1.25rem;
		top: 0.375rem;
		width: 1rem;
		height: 1rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		background: var(--color-surface);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
	}

	.timeline-entry:hover .entry-dot {
		transform: scale(1.25);
	}

	.dot-inner {
		width: 6px;
		height: 6px;
		background: color-mix(in srgb, var(--color-primary) 40%, transparent);
		border-radius: 50%;
	}

	.timeline-entry:first-child .dot-inner {
		background: var(--color-primary);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.entry-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	@media (min-width: 768px) {
		.entry-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: baseline;
		}
	}

	.entry-header h4 {
		font-size: 1.5rem;
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		margin: 0;
		transition: color 0.3s ease;
	}

	.timeline-entry:hover h4 {
		color: var(--color-primary);
	}

	.entry-period {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
	}

	.entry-period.current {
		color: var(--color-primary);
		font-weight: 700;
	}

	.entry-position {
		font-size: 0.75rem;
		font-weight: 700;
		color: color-mix(in srgb, var(--color-primary) 60%, transparent);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 0.75rem 0;
	}

	.entry-description {
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		line-height: 1.6;
		max-width: 42rem;
		margin: 0;
	}

	/* Philosophy */
	.philosophy-section {
		margin-top: 5rem;
		padding-top: 2rem;
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.philosophy-section {
			grid-template-columns: 1fr auto;
		}
	}

	.philosophy-content h5 {
		font-size: 0.625rem;
		font-weight: 900;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0 0 1rem 0;
	}

	.philosophy-content p {
		font-size: 0.875rem;
		color: var(--color-on-surface-variant);
		font-weight: 300;
		line-height: 1.6;
		margin: 0;
		max-width: 32rem;
	}

	.philosophy-content strong {
		color: var(--color-on-surface);
	}

	.philosophy-signature {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: color-mix(in srgb, var(--color-primary) 40%, transparent);
		text-transform: uppercase;
	}

	.signature {
		font-weight: 900;
		color: var(--color-on-surface);
		font-size: 0.625rem;
		letter-spacing: 0.05em;
	}

	/* Meta Footer */
	.meta-footer {
		width: 100%;
		max-width: 72rem;
		margin-top: 1.5rem;
		padding: 0 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		color: color-mix(in srgb, var(--color-primary) 30%, transparent);
		text-transform: uppercase;
	}

	.meta-items {
		display: flex;
		gap: 1rem;
	}
</style>
