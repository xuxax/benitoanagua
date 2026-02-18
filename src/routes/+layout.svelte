<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import '$lib/styles/app.css';

	let { children } = $props();

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
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
