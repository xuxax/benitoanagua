<script lang="ts">
	import { loadCVData, getAllFocuses } from '$lib/data/cv-loader';

	const cvData = loadCVData();
	const focuses = getAllFocuses();

	function getFocusRoute(focusName: string): string {
		switch (focusName) {
			case 'developer':
				return '/developer';
			case 'designer':
				return '/designer';
			case 'graphic':
				return '/graphic';
			default:
				return '/';
		}
	}

	function getFocusNumber(focusName: string): string {
		switch (focusName) {
			case 'developer':
				return '01';
			case 'designer':
				return '02';
			case 'graphic':
				return '03';
			default:
				return '00';
		}
	}

	function getFocusIcon(focusName: string): string {
		switch (focusName) {
			case 'developer':
				return 'terminal';
			case 'designer':
				return 'layers';
			case 'graphic':
				return 'palette';
			default:
				return 'architecture';
		}
	}
</script>

<div class="portal-wrapper">
	<!-- Top Navigation Bar -->
	<header class="portal-header">
		<div class="header-container">
			<div class="header-left">
				<div class="logo-icon">
					<span class="material-symbols-outlined">architecture</span>
					<div class="corner-dot"></div>
				</div>
				<div class="header-title">
					<h1>{cvData.personal.name}</h1>
					<p>Lead Architect / Project ID: CV-2024</p>
				</div>
			</div>
			<div class="header-right">
				<div class="status-group">
					<span class="status-label">Status</span>
					<span class="status-value">Active_System</span>
				</div>
				<div class="status-group">
					<span class="status-label">Scale</span>
					<span class="status-value">1:1_Digital</span>
				</div>
				<div class="status-group">
					<span class="status-label">Revision</span>
					<span class="status-value">04.2024</span>
				</div>
			</div>
		</div>
	</header>

	<main class="portal-main">
		<!-- Hero Section -->
		<section class="hero-section">
			<div class="hero-accent"></div>
			<h2 class="hero-title">
				ARCHITECTURAL<br />OUTLINE
			</h2>
			<div class="hero-contact">
				<div class="contact-badge">
					<span class="material-symbols-outlined">mail</span>
					<span>{cvData.personal.email}</span>
				</div>
				<div class="contact-badge">
					<span class="material-symbols-outlined">location_on</span>
					<span>{cvData.personal.location}</span>
				</div>
			</div>
		</section>

		<!-- 3 Entry Points -->
		<section class="entry-grid">
			{#each focuses as focus}
				<a href={getFocusRoute(focus.name)} class="entry-card group">
					<div class="entry-number">{getFocusNumber(focus.name)}</div>
					<div class="entry-content">
						<span class="material-symbols-outlined entry-icon">{getFocusIcon(focus.name)}</span>
						<h3 class="entry-title">{focus.title}</h3>
						<p class="entry-subtitle">{focus.summary.slice(0, 50)}...</p>
						<div class="entry-divider"></div>
						<ul class="entry-skills">
							{#each focus.skills.slice(0, 3) as skillCategory}
								<li>&gt; {skillCategory.category.toUpperCase().replace(/_/g, ' ')}</li>
							{/each}
						</ul>
					</div>
					<div class="entry-corner"></div>
				</a>
			{/each}
		</section>

		<!-- Footer Section -->
		<footer class="portal-footer">
			<div class="footer-specs">
				<span class="specs-label">Project Specs</span>
				<div class="specs-grid">
					<div class="spec-item">
						<span class="spec-key">Email_Ref</span>
						<span class="spec-value">{cvData.personal.email}</span>
					</div>
					<div class="spec-item">
						<span class="spec-key">Network_01</span>
						<span class="spec-value">LinkedIn/BAI</span>
					</div>
					<div class="spec-item">
						<span class="spec-key">Network_02</span>
						<span class="spec-value">GitHub/BAI-ARCH</span>
					</div>
				</div>
			</div>
			<button class="download-btn">
				Download PDF Specifications
				<span class="material-symbols-outlined">download</span>
			</button>
		</footer>
	</main>

	<!-- Blueprint Visual Elements -->
	<div class="blueprint-overlay">
		<div class="measure-line horizontal top-1"></div>
		<div class="measure-line horizontal top-2"></div>
		<div class="measure-line vertical left-1"></div>
		<div class="measure-line vertical left-2"></div>
		<div class="coord-marker top-left">X: 0.000<br />Y: 1.000</div>
		<div class="coord-marker top-right">X: 1.000<br />Y: 1.000</div>
		<div class="coord-marker bottom-left">X: 0.000<br />Y: 0.000</div>
		<div class="coord-marker bottom-right">X: 1.000<br />Y: 0.000</div>
	</div>
</div>

<style>
	.portal-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--color-background);
		background-image: var(--blueprint-grid);
		background-size: 40px 40px;
		color: var(--color-on-background);
		position: relative;
		overflow-x: hidden;
	}

	/* Header */
	.portal-header {
		position: relative;
		z-index: 10;
		border-bottom: 1px solid var(--stroke-outline);
		background-color: var(--color-surface-container);
		backdrop-filter: blur(8px);
		padding: 1rem 1.5rem;
	}

	@media (min-width: 768px) {
		.portal-header {
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
		gap: 1rem;
	}

	.logo-icon {
		position: relative;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-icon .material-symbols-outlined {
		font-size: 1.25rem;
		color: var(--color-primary);
	}

	.corner-dot {
		position: absolute;
		top: -3px;
		left: -3px;
		width: 6px;
		height: 6px;
		background: var(--color-primary);
	}

	.header-title h1 {
		font-size: 1.25rem;
		font-weight: 900;
		color: var(--color-on-surface);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.header-title p {
		font-size: 0.625rem;
		color: var(--color-primary);
		font-weight: 500;
		letter-spacing: 0.2em;
		margin: 0.25rem 0 0 0;
	}

	.header-right {
		display: none;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.header-right {
			display: flex;
		}
	}

	.status-group {
		display: flex;
		flex-direction: column;
		font-size: 0.6875rem;
		font-family: var(--font-mono);
		color: var(--stroke-secondary);
		padding-left: 2rem;
		border-left: 1px solid var(--stroke-outline);
	}

	.status-label {
		font-size: 0.5625rem;
		opacity: 0.5;
		text-transform: uppercase;
	}

	.status-value {
		color: var(--color-on-surface);
		font-weight: 500;
	}

	/* Main */
	.portal-main {
		flex: 1;
		max-width: 80rem;
		margin: 0 auto;
		padding: 4rem 1.5rem;
		width: 100%;
	}

	@media (min-width: 768px) {
		.portal-main {
			padding: 4rem 3rem;
		}
	}

	/* Hero */
	.hero-section {
		position: relative;
		margin-bottom: 5rem;
		padding-left: 1.5rem;
	}

	.hero-accent {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 1px;
		background: linear-gradient(
			to bottom,
			var(--color-primary),
			var(--stroke-tertiary),
			transparent
		);
	}

	.hero-title {
		font-size: clamp(3rem, 10vw, 8rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 0.9;
		margin: 0;
		color: var(--color-on-surface);
		opacity: 0.15;
		-webkit-text-stroke: 1px var(--stroke-tertiary);
	}

	@media (min-width: 768px) {
		.hero-title {
			opacity: 0.4;
		}
	}

	.hero-contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.contact-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-surface-container);
		border: 1px solid var(--stroke-outline);
		font-size: 0.75rem;
		font-family: var(--font-mono);
		letter-spacing: 0.05em;
	}

	.contact-badge .material-symbols-outlined {
		font-size: 1rem;
		color: var(--color-primary);
	}

	/* Entry Grid */
	.entry-grid {
		display: grid;
		grid-template-columns: 1fr;
		border: 1px solid var(--stroke-outline);
		background: var(--color-surface-container);
	}

	@media (min-width: 768px) {
		.entry-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.entry-card {
		position: relative;
		padding: 2.5rem;
		text-decoration: none;
		color: inherit;
		overflow: hidden;
		transition: background-color 0.3s ease;
		border-bottom: 1px solid var(--stroke-outline);
	}

	@media (min-width: 768px) {
		.entry-card:not(:last-child) {
			border-right: 1px solid var(--stroke-outline);
			border-bottom: none;
		}
	}

	.entry-card:hover {
		background: var(--color-surface-container-high);
	}

	.entry-number {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 2.5rem;
		font-weight: 900;
		font-family: var(--font-mono);
		color: var(--color-primary);
		opacity: 0.2;
		transition: opacity 0.3s ease;
	}

	.entry-card:hover .entry-number {
		opacity: 1;
	}

	.entry-content {
		position: relative;
		z-index: 1;
	}

	.entry-icon {
		font-size: 2.5rem;
		color: var(--color-primary);
		margin-bottom: 1.5rem;
	}

	.entry-title {
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
		color: var(--color-on-surface);
	}

	.entry-subtitle {
		font-size: 0.875rem;
		color: var(--stroke-secondary);
		font-weight: 500;
		letter-spacing: 0.05em;
		margin: 0 0 2rem 0;
	}

	.entry-divider {
		height: 1px;
		background: var(--stroke-outline);
		margin-bottom: 1.5rem;
		transition: background-color 0.3s ease;
	}

	.entry-card:hover .entry-divider {
		background: var(--color-primary);
	}

	.entry-skills {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.6875rem;
		font-family: var(--font-mono);
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.entry-card:hover .entry-skills {
		opacity: 1;
	}

	.entry-skills li {
		margin-bottom: 0.5rem;
	}

	.entry-corner {
		position: absolute;
		bottom: -0.5rem;
		left: -0.5rem;
		width: 2rem;
		height: 2rem;
		border-top: 1px solid var(--stroke-tertiary);
		border-right: 1px solid var(--stroke-tertiary);
		transition: border-color 0.3s ease;
	}

	.entry-card:hover .entry-corner {
		border-color: var(--color-primary);
	}

	/* Footer */
	.portal-footer {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-top: 2.5rem;
		border-top: 1px solid var(--stroke-outline);
		margin-top: 5rem;
	}

	@media (min-width: 768px) {
		.portal-footer {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.footer-specs {
		flex: 1;
	}

	.specs-label {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		color: var(--color-primary);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		display: block;
		margin-bottom: 1rem;
	}

	.specs-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.spec-item {
		padding-left: 1rem;
		border-left: 1px solid var(--stroke-outline);
	}

	.spec-key {
		font-size: 0.5625rem;
		color: var(--fg-tertiary);
		text-transform: uppercase;
		display: block;
	}

	.spec-value {
		font-size: 0.875rem;
		font-family: var(--font-mono);
	}

	.download-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		background: var(--color-primary);
		color: var(--bg-surface);
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.download-btn:hover {
		background: var(--color-on-surface);
	}

	.download-btn .material-symbols-outlined {
		font-size: 1rem;
		transition: transform 0.2s ease;
	}

	.download-btn:hover .material-symbols-outlined {
		transform: translateX(4px);
	}

	/* Blueprint Overlay */
	.blueprint-overlay {
		position: fixed;
		inset: 0;
		pointer-events: none;
		opacity: 0.1;
		z-index: 0;
	}

	.measure-line {
		position: absolute;
		background: var(--color-primary);
	}

	.measure-line.horizontal {
		height: 1px;
		left: 0;
		right: 0;
	}

	.measure-line.horizontal.top-1 {
		top: 25%;
	}
	.measure-line.horizontal.top-2 {
		top: 75%;
	}

	.measure-line.vertical {
		width: 1px;
		top: 0;
		bottom: 0;
	}

	.measure-line.vertical.left-1 {
		left: 25%;
	}
	.measure-line.vertical.left-2 {
		right: 25%;
	}

	.coord-marker {
		position: absolute;
		font-size: 0.5rem;
		font-family: var(--font-mono);
		color: var(--color-primary);
		text-transform: uppercase;
		line-height: 1.4;
	}

	.coord-marker.top-left {
		top: 2.5rem;
		left: 2.5rem;
	}
	.coord-marker.top-right {
		top: 2.5rem;
		right: 2.5rem;
		text-align: right;
	}
	.coord-marker.bottom-left {
		bottom: 2.5rem;
		left: 2.5rem;
	}
	.coord-marker.bottom-right {
		bottom: 2.5rem;
		right: 2.5rem;
		text-align: right;
	}
</style>
