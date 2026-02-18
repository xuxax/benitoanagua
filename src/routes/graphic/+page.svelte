<script lang="ts">
	import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
	import PortalLayout from '$lib/components/PortalLayout.svelte';

	const cvData = loadCVData();
	const graphicFocus = getFocusByName('graphic');

	const navItems = [
		{ label: 'Profile', href: '#profile' },
		{ label: 'Production', href: '#production' },
		{ label: 'History', href: '#history' },
		{ label: 'Contact', href: '#contact' }
	];

	const stats = [
		{ label: 'Software Stack', value: 'Adobe Suite', progress: 95 },
		{ label: 'Production Output', value: '500+ Projects', progress: 100 },
		{ label: 'Pre-Press Accuracy', value: '99.9% Zero-Error', progress: 99 },
		{ label: 'Client Identity', value: '40+ Brands', progress: 85 }
	];

	const competencies = [
		{
			icon: 'print',
			title: 'Offset Printing',
			description:
				'Mastery of CMYK color management, aluminum plate chemistry, and paper stock GSM optimization for high-volume runs.',
			items: ['Color Calibration', 'Plate Management']
		},
		{
			icon: 'grid_on',
			title: 'Serigrafía',
			description:
				'Technical screen printing production including mesh selection, emulsion coating, and spot-color layering for industrial finishes.',
			items: ['Pantones Experts', 'Textile & Plastic']
		},
		{
			icon: 'precision_manufacturing',
			title: 'Pre-press Logistics',
			description:
				'High-precision layout optimization, bleed technicals, trapping adjustments, and final output PDF/X-1a verification.',
			items: ['Dieline Design', 'Imposition Rules']
		},
		{
			icon: 'draw',
			title: 'Industrial Identity',
			description:
				'Creation of brand architecture that maintains visual integrity across both 300dpi print and digital interface environments.',
			items: ['Brand Manuals', 'Scalable Assets']
		}
	];
</script>

<PortalLayout {navItems} showBackButton={true}>
	<div class="graphic-container">
		<!-- Hero Section -->
		<section class="hero-section" id="profile">
			<div class="hero-content">
				<span class="hero-label">Senior Graphic Production Specialist</span>
				<h1 class="hero-title">
					Precision <span class="highlight">Design</span> Standards.
				</h1>
				<p class="hero-description">
					18 years of technical mastery bridging the gap between artistic vision and industrial
					production. Specialist in <strong
						>Offset, Serigrafía, and High-Volume Digital workflows.</strong
					>
				</p>
				<div class="hero-badges">
					<div class="badge-item">
						<span class="material-symbols-outlined">verified</span>
						<span>CMYK Certified</span>
					</div>
					<div class="badge-item">
						<span class="material-symbols-outlined">layers</span>
						<span>Adobe CS Expert</span>
					</div>
				</div>
			</div>
			<div class="hero-image-wrapper">
				<div class="hero-image-frame">
					<img
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL8pjDOr__Xvfp5W3k2Twxut8yqYvWCVbRihRkJzYxn7qPHQkKqMEWAVL1g2tIgw-4z3QRlcpff-sj8go0ouQk8iItAwzbNrIYORTFRvWd11y5eb0x1zG1Y-kNCQlzGn7l-fUmV0HeZwig3dkD55UK23ILCpShYw6Ol64aLN_fhB53ZHAKsvJe7i_Lh-QTgK6RYQNoL-u6cIaz0Goui4ph7LG0lHlKeP3tBg-WnDhUrq-vqxXvPS5Nm97E4npRhq01h-7dpMDq0A"
						alt="Technical Drafting"
					/>
					<span class="image-ref">IMG_REF: 018-TECHNICAL-PRO</span>
				</div>
				<div class="experience-badge">
					<span class="exp-value">18</span>
					<span class="exp-label">Experience Years</span>
				</div>
			</div>
		</section>

		<!-- Technical Stats Bar -->
		<section class="stats-section">
			{#each stats as stat}
				<div class="stat-card">
					<span class="stat-label">{stat.label}</span>
					<span class="stat-value">{stat.value}</span>
					<div class="stat-progress">
						<div class="stat-progress-fill" style="width: {stat.progress}%"></div>
					</div>
				</div>
			{/each}
		</section>

		<!-- Production Competencies -->
		<section class="production-section" id="production">
			<div class="section-header">
				<h2 class="section-title">02. Production Capability Matrix</h2>
				<span class="section-ref">Ind-Standard-Spec-V2</span>
			</div>

			<div class="competencies-grid">
				{#each competencies as comp}
					<div class="competency-card">
						<span class="comp-icon material-symbols-outlined">{comp.icon}</span>
						<h3>{comp.title}</h3>
						<p>{comp.description}</p>
						<ul>
							{#each comp.items as item}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- Work History -->
		<section class="history-section" id="history">
			<div class="section-header">
				<h2 class="section-title">03. Project Logs & Experience</h2>
			</div>

			<div class="history-list">
				{#each graphicFocus?.experiences || [] as exp}
					<div class="history-item">
						<div class="history-period">
							<span class="period-dates">{exp.period.replace(' - ', ' — ')}</span>
							<h5>{exp.company}</h5>
							<span class="period-role">{exp.position}</span>
						</div>
						<div class="history-content">
							<p>{exp.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Contact Form -->
		<section class="contact-section" id="contact">
			<div class="contact-content">
				<h2>Initiate Project Build.</h2>
				<p>
					Ready to integrate 18 years of production excellence into your next industrial or digital
					design venture.
				</p>
				<div class="contact-info">
					<div>
						<span class="material-symbols-outlined">alternate_email</span>
						<span>ops@designer-integral.pro</span>
					</div>
					<div>
						<span class="material-symbols-outlined">location_on</span>
						<span>Chicago HQ, Industrial District</span>
					</div>
				</div>
			</div>
			<form class="contact-form">
				<div class="form-row">
					<input placeholder="REF_NAME" type="text" />
					<input placeholder="CONTACT_EMAIL" type="email" />
				</div>
				<textarea placeholder="PROJECT_SPECIFICATIONS" rows="4"></textarea>
				<button type="submit">Submit Specs</button>
			</form>
		</section>
	</div>
</PortalLayout>

<style>
	.graphic-container {
		display: flex;
		flex-direction: column;
	}

	/* Hero Section */
	.hero-section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		padding: 3rem 0;
		align-items: center;
	}

	@media (min-width: 1024px) {
		.hero-section {
			grid-template-columns: 1.2fr 1fr;
			gap: 4rem;
		}
	}

	.hero-label {
		display: inline-block;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.3em;
		margin-bottom: 1.5rem;
	}

	.hero-title {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 0.9;
		margin: 0 0 1.5rem 0;
		color: var(--color-on-surface);
	}

	.hero-title .highlight {
		font-style: italic;
		color: var(--color-primary);
	}

	.hero-description {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--color-on-surface-variant);
		margin: 0 0 2rem 0;
		max-width: 36rem;
	}

	.hero-description strong {
		color: var(--color-on-surface);
	}

	.hero-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.badge-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: var(--color-surface-container);
		border: 1px solid var(--color-outline-variant);
	}

	.badge-item .material-symbols-outlined {
		color: var(--color-primary);
	}

	.badge-item span:last-child {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.hero-image-wrapper {
		display: none;
		position: relative;
	}

	@media (min-width: 768px) {
		.hero-image-wrapper {
			display: block;
		}
	}

	.hero-image-frame {
		border: 2px solid var(--color-on-surface);
		padding: 0.5rem;
		position: relative;
	}

	.hero-image-frame img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		filter: grayscale(100%);
		transition: filter 0.5s ease;
	}

	.hero-image-frame:hover img {
		filter: grayscale(0);
	}

	.image-ref {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		padding: 0.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-outline-variant);
		font-family: var(--font-mono);
		font-size: 0.625rem;
	}

	.experience-badge {
		position: absolute;
		bottom: -1rem;
		right: -1rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		padding: 1rem;
		text-align: center;
	}

	.exp-value {
		display: block;
		font-size: 2rem;
		font-weight: 900;
		line-height: 1;
	}

	.exp-label {
		font-size: 0.5rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* Stats Section */
	.stats-section {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 2px solid var(--color-on-surface);
		background: var(--color-surface);
	}

	@media (min-width: 768px) {
		.stats-section {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-card {
		padding: 1.5rem;
		border: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.stat-card {
			border-right: 1px solid var(--color-outline-variant);
		}

		.stat-card:last-child {
			border-right: none;
		}
	}

	.stat-label {
		display: block;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		margin-bottom: 0.5rem;
	}

	.stat-value {
		display: block;
		font-size: 1.25rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin-bottom: 0.5rem;
	}

	.stat-progress {
		height: 0.25rem;
		background: var(--color-surface-container);
	}

	.stat-progress-fill {
		height: 100%;
		background: var(--color-primary);
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
			align-items: center;
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
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
	}

	/* Production Section */
	.production-section {
		padding: 4rem 0;
	}

	.competencies-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.competencies-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.competencies-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.competency-card {
		padding: 1.5rem;
		border: 1px solid var(--color-outline-variant);
		background: var(--color-surface);
		transition: border-color 0.2s ease;
	}

	.competency-card:hover {
		border-color: var(--color-primary);
	}

	.comp-icon {
		font-size: 2rem;
		color: var(--color-primary);
		margin-bottom: 1rem;
		display: block;
	}

	.competency-card h3 {
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 0.75rem 0;
		color: var(--color-on-surface);
	}

	.competency-card p {
		font-size: 0.8125rem;
		color: var(--color-on-surface-variant);
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}

	.competency-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.competency-card li {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
		padding-left: 0.75rem;
		position: relative;
		margin-bottom: 0.25rem;
	}

	.competency-card li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 0.375rem;
		height: 0.375rem;
		background: var(--color-primary);
	}

	/* History Section */
	.history-section {
		padding: 4rem 0;
		border-top: 1px solid var(--color-outline-variant);
	}

	.history-list {
		display: flex;
		flex-direction: column;
	}

	.history-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-outline-variant);
	}

	@media (min-width: 768px) {
		.history-item {
			grid-template-columns: 1fr 3fr;
			gap: 2rem;
		}
	}

	.period-dates {
		display: block;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.history-period h5 {
		font-size: 1.25rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0.5rem 0 0.25rem 0;
		color: var(--color-on-surface);
	}

	.period-role {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.5;
	}

	.history-content p {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	/* Contact Section */
	.contact-section {
		padding: 4rem;
		background: var(--color-on-surface);
		color: var(--color-surface);
		position: relative;
		overflow: hidden;
	}

	.contact-section::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 16rem;
		height: 16rem;
		background: var(--color-primary);
		opacity: 0.2;
		border-radius: 50%;
		filter: blur(4rem);
		transform: translate(50%, -50%);
	}

	.contact-content {
		position: relative;
		z-index: 1;
		margin-bottom: 2rem;
	}

	.contact-content h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0 0 1rem 0;
	}

	.contact-content p {
		font-size: 1rem;
		opacity: 0.6;
		margin: 0 0 2rem 0;
		max-width: 24rem;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-info div {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.contact-info .material-symbols-outlined {
		color: var(--color-primary);
	}

	.contact-info span:last-child {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.contact-form {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.contact-form input,
	.contact-form textarea {
		padding: 1rem;
		background: var(--color-surface-container);
		border: none;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-on-surface);
	}

	.contact-form input::placeholder,
	.contact-form textarea::placeholder {
		color: var(--color-on-surface-variant);
		opacity: 0.5;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: 2px solid var(--color-primary);
	}

	.contact-form button {
		padding: 1rem;
		background: var(--color-primary);
		color: var(--color-on-primary);
		border: none;
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.contact-form button:hover {
		background: var(--color-surface);
		color: var(--color-on-surface);
	}
</style>
