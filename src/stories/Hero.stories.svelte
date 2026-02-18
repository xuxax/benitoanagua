<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Hero from '$lib/components/Hero.svelte';
	import Button from '$lib/components/Button.svelte';

	const { Story } = defineMeta({
		title: 'Components/Hero',
		tags: ['autodocs']
	});
</script>

<Story name="Minimalist Overview">
	<div class="story-container">
		<div class="demo-box">
			<Hero
				title="Design Engineering"
				subtitle="Exploring the intersection of technical systems and human-centric design interfaces."
			>
				<Button variant="primary">Read Manifesto</Button>
				<Button variant="ghost">About Me</Button>
			</Hero>
		</div>

		<div class="demo-box">
			<Hero title="Simple Title Only" />
		</div>
	</div>
</Story>

<style>
	.story-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-height: 100vh;
		background: var(--color-background);
	}

	.demo-box {
		border-bottom: 1px solid var(--color-outline-variant);
	}
</style>
