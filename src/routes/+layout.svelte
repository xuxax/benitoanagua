<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { SOCIAL_LINKS } from '$lib/config';
	import '$lib/styles/app.css';

	let { children, data } = $props();

	onMount(() => {
		if (browser) {
			const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme = saved ?? (prefersDark ? 'dark' : 'light');

			document.documentElement.setAttribute('data-theme', theme);

			// Escucha cambios del sistema solo si no hay preferencia guardada
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
				}
			});
		}
	});
</script>

<svelte:head>
	<!-- Favicon and icons -->
	<link rel="icon" href={favicon} />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-title" content="Benito Anagua" />

	<!-- SEO Meta Tags -->
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />
	<meta name="author" content={data.seo.author} />
	<meta name="creator" content={data.seo.author} />
	<link rel="canonical" href={data.seo.canonical} />

	<!-- Open Graph / Social Media -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.seo.title} />
	<meta property="og:description" content={data.seo.description} />
	<meta property="og:image" content={data.seo.ogImage} />
	<meta property="og:url" content={data.seo.canonical} />
	<meta property="og:site_name" content="Benito Anagua — Portfolio" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.seo.title} />
	<meta name="twitter:description" content={data.seo.description} />
	<meta name="twitter:image" content={data.seo.ogImage} />

	<!-- Structured Data (JSON-LD) -->
	<script type="application/ld+json">
		{{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "{data.seo.author}",
			"url": "{data.seo.canonical}",
			"image": "{data.seo.ogImage}",
			"jobTitle": "Interdisciplinary Creator",
			"description": "{data.seo.description}",
			"email": "{data.seo.email}",
			"sameAs": [
				"{SOCIAL_LINKS.linkedin}",
				"{SOCIAL_LINKS.github}"
			]
		}}
	</script>

	<!-- Font preconnects -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

{@render children()}
