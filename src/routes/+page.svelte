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
				return 'palette';
			default:
				return 'architecture';
		}
	}
</script>

<PortalLayout {navItems}>
	<div class="home-grid">
		<!-- Header Section -->
		<section class="header-section">
			<div class="header-content">
				<div class="header-title-block">
					<span class="header-label">
						<span class="material-symbols-outlined">architecture</span>
						<span>System v1.0 // Scale 1:1</span>
					</span>
					<h1 class="header-name">
						Benito<br />Anagua Ibarra
					</h1>
				</div>
				<div class="header-status">
					<div class="status-block">
						<span class="status-dot"></span>
						<span>Live System Online</span>
					</div>
					<div class="location-block">
						<p class="location-main">Tarija, Bolivia</p>
						<p class="location-coords">COORD: 21.532° S, 64.719° W</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Main Content Grid -->
		<div class="main-grid">
			<!-- Left Sidebar: Contact -->
			<aside class="sidebar">
				<div class="contact-card">
					<div class="contact-id">ID-8821</div>

					<div class="contact-section">
						<span class="contact-label">Phone_Ref</span>
						<p class="contact-value">{cvData.personal.phone}</p>
					</div>

					<div class="contact-section">
						<span class="contact-label">Email_Address</span>
						<p class="contact-value">{cvData.personal.email}</p>
					</div>

					<div class="contact-section">
						<span class="contact-label">Location</span>
						<p class="contact-value">{cvData.personal.location}</p>
					</div>
				</div>
			</aside>

			<!-- Right: Profile Cards -->
			<section class="cards-section">
				<div class="cards-grid">
					{#each focuses as focus, index}
						<a href={getFocusRoute(focus.name)} class="profile-card">
							<div class="card-header">
								<span class="card-number">{String(index + 1).padStart(2, '0')}</span>
								<span class="material-symbols-outlined card-icon">{getFocusIcon(focus.name)}</span>
							</div>
							<div class="card-content">
								<h3 class="card-title">{focus.title}</h3>
								<p class="card-subtitle">{focus.summary.slice(0, 80)}...</p>
								<div class="card-skills">
									{#each focus.skills.slice(0, 2) as skill}
										<span class="skill-tag">{skill.category}</span>
									{/each}
								</div>
							</div>
						</a>
					{/each}
				</div>
			</section>
		</div>
	</div>
</PortalLayout>

<style>
	.home-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Header Section */
	.header-section {
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 2rem;
	}

	.header-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.header-content {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.header-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin-bottom: 0.75rem;
	}

	.header-label .material-symbols-outlined {
		font-size: 1rem;
	}

	.header-name {
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 0.9;
		margin: 0;
		color: var(--color-on-surface);
	}

	.header-status {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.status-block {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: var(--color-primary);
		border-radius: 50%;
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

	.status-block span:last-child {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
	}

	.location-block {
		text-align: right;
	}

	.location-main {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		color: var(--color-on-surface);
	}

	.location-coords {
		font-size: 0.6875rem;
		font-family: var(--font-mono);
		color: var(--color-on-surface-variant);
		margin: 0.25rem 0 0 0;
	}

	/* Main Grid */
	.main-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.main-grid {
			grid-template-columns: 280px 1fr;
		}
	}

	/* Sidebar */
	.sidebar {
		display: none;
	}

	@media (min-width: 1024px) {
		.sidebar {
			display: block;
		}
	}

	.contact-card {
		position: relative;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface-container);
		padding: 1.5rem;
	}

	.contact-id {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-size: 0.5625rem;
		font-family: var(--font-mono);
		color: var(--color-outline);
	}

	.contact-section {
		margin-bottom: 1.25rem;
	}

	.contact-section:last-child {
		margin-bottom: 0;
	}

	.contact-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin-bottom: 0.375rem;
	}

	.contact-value {
		font-size: 0.875rem;
		font-weight: 600;
		margin: 0;
		color: var(--color-on-surface);
		word-break: break-word;
	}

	/* Cards Grid */
	.cards-section {
		width: 100%;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.cards-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Profile Card */
	.profile-card {
		position: relative;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface-container);
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		min-height: 280px;
		transition: all 0.3s ease;
	}

	.profile-card:hover {
		background: var(--color-surface);
		border-color: var(--color-primary);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: auto;
	}

	.card-number {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 900;
		color: var(--color-on-surface-variant);
		opacity: 0.3;
		line-height: 1;
		transition:
			opacity 0.3s ease,
			color 0.3s ease;
	}

	.profile-card:hover .card-number {
		opacity: 1;
		color: var(--color-primary);
	}

	.card-icon {
		font-size: 1.5rem;
		color: var(--color-on-surface-variant);
		opacity: 0.4;
		transition:
			opacity 0.3s ease,
			color 0.3s ease;
	}

	.profile-card:hover .card-icon {
		opacity: 1;
		color: var(--color-primary);
	}

	.card-content {
		margin-top: 1.5rem;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		margin: 0 0 0.5rem 0;
		color: var(--color-on-surface);
		transition: color 0.3s ease;
	}

	.profile-card:hover .card-title {
		color: var(--color-primary);
	}

	.card-subtitle {
		font-size: 0.6875rem;
		color: var(--color-on-surface-variant);
		line-height: 1.5;
		margin: 0 0 1rem 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.skill-tag {
		font-size: 0.5625rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.5rem;
		background: var(--color-primary-container);
		color: var(--color-primary);
		border: 1px solid var(--color-outline-variant);
	}
</style>
