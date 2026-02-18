<script lang="ts">
	import { getAllFocuses, getPersonalInfo, getEducation } from '$lib/data/cv-loader';
	import { loadSiteData } from '$lib/data/site-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const personal = $derived(getPersonalInfo());
	const focuses = $derived(getAllFocuses());
	const education = $derived(getEducation());
	const site = $derived(loadSiteData());

	const navItems = $derived(site.nav.profiles.map((p) => ({ label: p.label, href: p.href })));

	function getFocusSiteData(focusName: string) {
		return (
			site.nav.profiles.find((p) => p.href.includes(focusName)) || {
				code: '00',
				icon: 'architecture',
				href: '/'
			}
		);
	}
</script>

<svelte:head>
	<title>{personal.name} — {site.meta.tagline}</title>
	<meta name="description" content="{personal.name} — {site.meta.description}" />
</svelte:head>

<PortalLayout {navItems}>
	<div class="home-container">
		<!-- Hero Section -->
		<section class="hero-section">
			<div class="hero-eyebrow">
				<span class="eyebrow-line"></span>
				<span class="eyebrow-text">{site.nav.hero_eyebrow}</span>
			</div>

			<h1 class="hero-name">{personal.name}</h1>

			<p class="hero-tagline">
				{site.meta.description}
			</p>

			<div class="hero-contact">
				<a href="mailto:{personal.email}" class="contact-chip">
					<span class="material-symbols-outlined">mail</span>
					{personal.email}
				</a>
				<a href={personal.maps} target="_blank" rel="noopener" class="contact-chip">
					<span class="material-symbols-outlined">location_on</span>
					{personal.location}
				</a>
				<a href={personal.linkedin} target="_blank" rel="noopener" class="contact-chip">
					<span class="material-symbols-outlined">open_in_new</span>
					LinkedIn
				</a>
				<a href={personal.github} target="_blank" rel="noopener" class="contact-chip">
					<span class="material-symbols-outlined">code</span>
					GitHub
				</a>
				<a href={personal.behance} target="_blank" rel="noopener" class="contact-chip">
					<span class="material-symbols-outlined">palette</span>
					Behance
				</a>
			</div>
		</section>

		<!-- Profiles Grid -->
		<section class="profiles-section">
			<div class="profiles-header">
				<h2 class="profiles-title">{site.nav.home_label}</h2>
				<span class="profiles-ref">{focuses.length} {site.nav.specializations_label}</span>
			</div>

			<div class="profiles-grid">
				{#each focuses as focus}
					{@const sData = getFocusSiteData(focus.name)}
					<a href={sData.href} class="profile-card">
						<div class="card-top">
							<span class="card-code">{sData.code}</span>
							<span class="material-symbols-outlined card-icon">{sData.icon}</span>
						</div>

						<h3 class="card-title">{focus.title}</h3>

						<p class="card-summary">{focus.summary.slice(0, 140)}…</p>

						<div class="card-skills">
							{#each focus.skills as skillGroup}
								<div class="skill-group">
									<span class="skill-category">{skillGroup.category}</span>
									<div class="skill-tags">
										{#each skillGroup.items.slice(0, 3) as item}
											<span class="skill-tag">{item}</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>

						<div class="card-cta">
							<span>{site.nav.view_cv_label}</span>
							<span class="material-symbols-outlined">arrow_forward</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- Education -->
		<section class="education-section">
			<div class="section-header">
				<h2 class="profiles-title">{site.nav.education_section_title}</h2>
			</div>
			<div class="education-grid">
				{#each education as entry}
					<div class="education-item">
						<span class="material-symbols-outlined edu-icon">school</span>
						<div class="edu-content">
							<strong class="edu-degree">{entry.degree}</strong>
							<span class="edu-university">{entry.institution} · {entry.year}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</PortalLayout>

<style>
	.home-container {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	/* ── Hero ── */
	.hero-section {
		padding: 3rem 0 2rem;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	.hero-eyebrow {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.eyebrow-line {
		display: block;
		width: 2.5rem;
		height: 1px;
		background: var(--color-primary);
	}

	.eyebrow-text {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-primary);
	}

	.hero-name {
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 6vw, 4.5rem);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 0.95;
		margin: 0 0 1.5rem 0;
		color: var(--color-on-surface);
	}

	.hero-tagline {
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 300;
		line-height: 1.65;
		color: var(--color-on-surface-variant);
		max-width: 52rem;
		margin: 0 0 2rem 0;
	}

	.hero-contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.contact-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.875rem;
		border: 1px solid var(--color-outline);
		background: var(--color-surface);
		color: var(--color-on-surface-variant);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border-radius: var(--radius-sm);
		transition: all var(--duration-base) var(--ease-out);
	}

	.contact-chip:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		box-shadow: var(--ring-primary);
		background: var(--color-primary-container);
	}

	.contact-chip:active {
		transform: scale(0.96);
	}

	.contact-chip .material-symbols-outlined {
		font-size: 0.875rem;
	}

	/* ── Profiles ── */
	.profiles-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.profiles-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.profiles-title {
		font-family: var(--font-display);
		font-size: 1.125rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.profiles-ref {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.profiles-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--color-outline-variant);
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.profiles-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.profile-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 2.5rem;
		background: var(--color-surface);
		text-decoration: none;
		color: inherit;
		transition: all var(--duration-base) var(--ease-out);
		position: relative;
		overflow: hidden;
	}

	.profile-card:hover {
		background: var(--color-surface-container-low);
		z-index: 1;
		box-shadow: inset 0 0 0 2px var(--color-primary);
	}

	.profile-card:hover .card-cta {
		color: var(--color-primary);
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.card-code {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-primary);
	}

	.card-icon {
		font-size: 1.5rem;
		color: var(--color-on-surface-variant);
		opacity: 0.4;
	}

	.card-title {
		font-size: 1.125rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin: 0;
		color: var(--color-on-surface);
	}

	.card-summary {
		font-size: 0.8125rem;
		line-height: 1.65;
		color: var(--color-on-surface-variant);
		margin: 0;
		flex: 1;
	}

	.card-skills {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-top: 1px solid var(--color-outline-variant);
		padding-top: 1rem;
	}

	.skill-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.skill-category {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-on-surface-variant);
		opacity: 0.6;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.skill-tag {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 500;
		padding: 0.125rem 0.5rem;
		border: 1px solid var(--color-outline-variant);
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.card-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		transition: color 0.2s ease;
		border-top: 1px solid var(--color-outline-variant);
		padding-top: 1rem;
	}

	.card-cta .material-symbols-outlined {
		font-size: 1rem;
	}

	/* ── Education ── */
	.education-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section-header {
		border-bottom: 2px solid var(--color-on-surface);
		padding-bottom: 0.5rem;
	}

	.education-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.education-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.education-item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem 2rem;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
	}

	.edu-icon {
		font-size: 2rem;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.edu-content {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.edu-degree {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		color: var(--color-on-surface);
	}

	.edu-university {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-primary);
	}
</style>
