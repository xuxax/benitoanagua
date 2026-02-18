<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/Button.svelte';
	import type { ButtonVariant, ButtonSize } from '$lib/types/Button.js';

	const { Story } = defineMeta({
		title: 'Components/Button',
		tags: ['autodocs']
	});

	const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'link'];
	const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>By Variant</h3>
			<div class="row">
				{#each variants as variant}
					<Button {variant}>{variant}</Button>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Size (Primary)</h3>
			<div class="row">
				{#each sizes as size}
					<Button variant="primary" {size}>{size}</Button>
				{/each}
			</div>
		</section>

		<section>
			<h3>States</h3>
			<div class="row">
				<Button variant="primary" disabled>Disabled</Button>
				<Button variant="outline" disabled>Disabled Outline</Button>
				<Button variant="link" disabled>Disabled Link</Button>
			</div>
		</section>

		<section>
			<h3>Full Width</h3>
			<div style="width: 400px; border: 1px dashed var(--color-outline-variant); padding: 1rem;">
				<Button variant="primary" fullWidth>Full Width Button</Button>
			</div>
		</section>

		<section>
			<h3>As Link (Navigation)</h3>
			<div class="row">
				<Button variant="link" href="https://google.com">External Link</Button>
				<Button variant="primary" href="/local-path">Button Styled Link</Button>
			</div>
		</section>
	</div>
</Story>

<style>
	.story-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-on-background);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}
</style>
