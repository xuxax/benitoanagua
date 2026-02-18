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

	function toggleTheme() {
		currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
		applyTheme(currentTheme);
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

<div class="architectural-outline" data-theme={currentTheme}>
	{@render children()}

	<!-- Theme Toggle (Floating) -->
	<button
		class="theme-toggle"
		onclick={toggleTheme}
		aria-label="Toggle theme"
		title={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	>
		{#if currentTheme === 'dark'}
			<span class="material-symbols-outlined">light_mode</span>
		{:else}
			<span class="material-symbols-outlined">dark_mode</span>
		{/if}
	</button>
</div>

<style>
	.architectural-outline {
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-on-background);
		background-image: var(--blueprint-grid);
		background-size: 40px 40px;
	}

	/* Theme Toggle Button */
	.theme-toggle {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 100;
		width: 3rem;
		height: 3rem;
		border: var(--hairline-border);
		background: var(--color-surface-container);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--color-primary);
		transition: all 0.2s ease;
		border-radius: 2px;
	}

	.theme-toggle:hover {
		background: var(--color-primary-container);
		border-color: var(--color-primary);
	}

	.theme-toggle .material-symbols-outlined {
		font-size: 1.5rem;
	}
</style>
