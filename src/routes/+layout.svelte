<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import '$lib/styles/app.css';

	let { children } = $props();
	let currentTheme = $state<'light' | 'dark'>('dark');

	onMount(() => {
		if (browser) {
			const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';

			currentTheme = savedTheme || systemTheme;
			applyTheme(currentTheme);

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			mediaQuery.addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					currentTheme = e.matches ? 'dark' : 'light';
					applyTheme(currentTheme);
				}
			});
		}
	});

	function applyTheme(theme: 'light' | 'dark') {
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	}
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

<div data-theme={currentTheme}>
	{@render children()}
</div>
