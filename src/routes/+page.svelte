<script lang="ts">
	import { loadCVData, getAllFocuses } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const focuses = getAllFocuses();

	const navItems = [
		{ label: 'Full Stack', href: '/developer' },
		{ label: 'UI/UX', href: '/designer' },
		{ label: 'Graphic', href: '/graphic' }
	];

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

	function getFocusIcon(focusName: string): string {
		switch (focusName) {
			case 'developer':
				return 'terminal';
			case 'designer':
				return 'layers';
			case 'graphic':
				return 'draw';
			default:
				return 'architecture';
		}
	}
</script>

<PortalLayout {navItems}>
	<div class="home-container">
		<!-- Hero Section -->
		<section class="hero-section">
			<div class="hero-grid">
				<div class="hero-content">
					<p class="hero-label">Structural Engineer of Digital Products</p>
					<h1 class="hero-title">
						Creative<br />Engineer
					</h1>
					<div class="hero-description">
						<p>
							Benito Anagua Ibarra. Senior Multidisciplinary professional with 18 years of technical
							excellence in merging high-end engineering with precise visual clarity.
						</p>
					</div>
				</div>
				<div class="hero-image-wrapper">
					<div class="hero-image-container">
						<img
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOa3g_o0vL575MU0ip0SrEUwfCGxMYA_WsDnXk8dnLFPUKBi5UwCsKEjCe3DvlSL5Tuss-BSlh3GWJL8nJ5s9e0D0HJFGjr_hULm0LTPn_BsNuHlnm6KktY48mwzfh_o9_SCs1A6rCn5VO9QET21IAZsWwD2Jmm0vjMYZB1BD5t7SKm-6RcSbQlez3PXLMZw8GO8vvRyvVqYF96UMbd00RniMs9d1U7rEASyAG0-f2VVxudABfVhg6KrCywYcBaHXf4CK3mD5VZA"
							alt="Benito Anagua Ibarra"
						/>
						<div class="image-overlay">
							<p class="image-ref">
								Ref: B.A.I_2024.SYS<br />
								Loc: Global / Remote<br />
								Exp: 18.00 Years
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Pillar Summary Section -->
		<section class="pillars-section">
			{#each focuses as focus, index}
				<a href={getFocusRoute(focus.name)} class="pillar-card">
					<div class="pillar-header">
						<span class="pillar-number">0{index + 1}</span>
						<span class="material-symbols-outlined pillar-icon">{getFocusIcon(focus.name)}</span>
					</div>
					<h3 class="pillar-title">{focus.title}</h3>
					<p class="pillar-description">{focus.summary.slice(0, 100)}...</p>
					<ul class="pillar-list">
						{#each focus.skills.slice(0, 3) as skill}
							<li>
								<span class="list-dot"></span>
								{skill.category}
							</li>
						{/each}
					</ul>
				</a>
			{/each}
		</section>

		<!-- Philosophy Section -->
		<section class="philosophy-section">
			<div class="philosophy-grid">
				<div class="philosophy-content">
					<h2 class="philosophy-title">
						Architectural Outline<br />
						<span class="highlight">Philosophy</span>
					</h2>
					<div class="philosophy-text">
						<p>
							My approach is defined by "The Structural Integrity of Pixels." Every element must
							serve a functional purpose within the grid.
						</p>
						<p>
							Drawing from 18 years of cross-disciplinary experience, I build digital products like
							high-end engineering blueprints: with precision, technical clarity, and an
							uncompromising focus on the core architecture.
						</p>
					</div>
					<div class="philosophy-actions">
						<a href="/developer" class="btn-primary">Explore Work</a>
						<a href="#contact" class="btn-secondary">View CV</a>
					</div>
				</div>
				<div class="philosophy-visual">
					<div class="visual-frame">
						<img
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvXg0QapluzvvpUCj9NOUBhyx5fFkSKyNHoOE8Taa0gvzc9i4W2lc9SDjp8S3EJ_5CwU7N6LNxXy6DMRVzHKPpTlJSYiyDTTeVvat-smXZz5NWWw7P0NCTo2hKHOfAiVV8cGDOfOPn3Ss4yv9zsp-Avn5GbE47qQJCu9TZkTk09gfIfxJW9CY08g8ZDZuoZmWZc9a148ppEFsezDX2GfRx7iLhbVYkLdjxoWVWI4wISh5PNKkO1Usp7nDMAMtHG-ALaS8E3ODfaw"
							alt="Abstract architectural lines"
						/>
						<span class="visual-label">Structural_Blueprint_v02.dwg</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.home-container {
		display: flex;
		flex-direction: column;
	}

	/* Hero Section */
	.hero-section {
		padding: 3rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: end;
	}

	@media (min-width: 1024px) {
		.hero-grid {
			grid-template-columns: 2fr 1fr;
			gap: 4rem;
		}
	}

	.hero-label {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.3em;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: clamp(3rem, 10vw, 7.5rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 0.85;
		margin: 0 0 2rem 0;
		color: var(--color-on-surface);
	}

	.hero-description {
		max-width: 36rem;
	}

	.hero-description p {
		font-size: 1.25rem;
		font-weight: 300;
		line-height: 1.6;
		opacity: 0.8;
		margin: 0;
	}

	.hero-image-wrapper {
		display: none;
	}

	@media (min-width: 768px) {
		.hero-image-wrapper {
			display: block;
		}
	}

	.hero-image-container {
		border: 2px solid var(--color-on-surface);
		padding: 0.5rem;
	}

	.hero-image-container img {
		width: 100%;
		aspect-ratio: 4/5;
		object-fit: cover;
		filter: grayscale(100%) contrast(1.25);
	}

	.image-overlay {
		margin-top: 1rem;
		padding: 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
	}

	.image-ref {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		line-height: 1.4;
		text-transform: uppercase;
		margin: 0;
	}

	/* Pillars Section */
	.pillars-section {
		display: grid;
		grid-template-columns: 1fr;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.pillars-section {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.pillar-card {
		padding: 2rem;
		border-bottom: 1px solid var(--color-outline-variant);
		text-decoration: none;
		color: inherit;
		transition: background-color 0.2s ease;
	}

	@media (min-width: 768px) {
		.pillar-card {
			border-bottom: none;
			border-right: 1px solid var(--color-outline-variant);
		}

		.pillar-card:last-child {
			border-right: none;
		}
	}

	.pillar-card:hover {
		background: var(--color-primary-container);
	}

	.pillar-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 3rem;
	}

	.pillar-number {
		font-size: 2.5rem;
		font-weight: 900;
		opacity: 0.1;
		line-height: 1;
	}

	.pillar-icon {
		font-size: 1.5rem;
		color: var(--color-primary);
	}

	.pillar-title {
		font-size: 1.5rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0 0 1rem 0;
		color: var(--color-on-surface);
	}

	.pillar-description {
		font-size: 0.875rem;
		line-height: 1.6;
		opacity: 0.7;
		margin: 0 0 2rem 0;
	}

	.pillar-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.pillar-list li {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.list-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: var(--color-primary);
	}

	/* Philosophy Section */
	.philosophy-section {
		padding: 4rem 0;
	}

	.philosophy-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
		align-items: center;
	}

	@media (min-width: 1024px) {
		.philosophy-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.philosophy-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1;
		margin: 0 0 2rem 0;
		color: var(--color-on-surface);
	}

	.philosophy-title .highlight {
		color: var(--color-primary);
	}

	.philosophy-text {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.philosophy-text p {
		font-size: 1.125rem;
		font-weight: 300;
		line-height: 1.6;
		margin: 0;
	}

	.philosophy-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn-primary {
		padding: 1rem 2rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: transform 0.2s ease;
	}

	.btn-primary:hover {
		transform: translateX(0.25rem) translateY(-0.25rem);
	}

	.btn-secondary {
		padding: 1rem 2rem;
		border: 2px solid var(--color-on-surface);
		color: var(--color-on-surface);
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.btn-secondary:hover {
		background: var(--color-on-surface);
		color: var(--color-surface);
	}

	.philosophy-visual {
		display: none;
	}

	@media (min-width: 768px) {
		.philosophy-visual {
			display: block;
		}
	}

	.visual-frame {
		position: relative;
		border: 1px solid var(--color-outline-variant);
		padding: 1rem;
	}

	.visual-frame img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		filter: grayscale(100%) opacity(0.5);
	}

	.visual-label {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 0.5rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		transform: rotate(90deg);
		transform-origin: right;
		white-space: nowrap;
	}
</style>
