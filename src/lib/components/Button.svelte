<script lang="ts">
	import type { ButtonProps } from '$lib/types/Button.js';

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		href = '',
		type = 'button',
		fullWidth = false,
		icon = false,
		onclick,
		class: className,
		children
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		{href}
		class="ax-button ax-button--{variant} ax-button--{size} {fullWidth
			? 'ax-button--full-width'
			: ''} {icon ? 'ax-button--icon' : ''} {disabled ? 'ax-button--disabled' : ''} {className ||
			''}"
		role="button"
		aria-disabled={disabled}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{type}
		class="ax-button ax-button--{variant} ax-button--{size} {fullWidth
			? 'ax-button--full-width'
			: ''} {icon ? 'ax-button--icon' : ''} {disabled ? 'ax-button--disabled' : ''} {className ||
			''}"
		{disabled}
		{onclick}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	.ax-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		/* Ring-based Architecture: Use box-shadow for all borders */
		border: none;
		border-radius: var(--space-1);
		font-family: var(--font-sans);
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		box-sizing: border-box;
		position: relative;
		outline: none;
		--ring-color-default: transparent;
		box-shadow: 0 0 0 var(--line-thin) var(--ring-color-default);
	}

	.ax-button:focus-visible {
		box-shadow:
			0 0 0 var(--ring-offset) var(--color-surface),
			0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color),
			0 0 0 var(--line-thin) var(--ring-color-default);
		z-index: 10;
	}

	.ax-button:active:not(.ax-button--disabled) {
		transform: scale(0.98);
	}

	/* Size variants - Consistent padding accounting for ring thickness */
	.ax-button--sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-sm);
	}

	.ax-button--md {
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-base);
	}

	.ax-button--lg {
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-lg);
	}

	/* Full width */
	.ax-button--full-width {
		width: 100%;
	}

	/* Icon only */
	.ax-button--icon {
		padding: var(--space-2);
	}

	/* Variant styles using ring system */
	.ax-button--primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		--ring-color-default: var(--color-primary);
	}

	.ax-button--primary:hover:not(.ax-button--disabled) {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		--ring-color-default: var(--color-primary-container);
	}

	.ax-button--secondary {
		background: var(--color-secondary);
		color: var(--color-on-secondary);
		--ring-color-default: var(--color-secondary);
	}

	.ax-button--secondary:hover:not(.ax-button--disabled) {
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		--ring-color-default: var(--color-secondary-container);
	}

	.ax-button--outline {
		background: transparent;
		color: var(--color-on-surface);
		--ring-color-default: var(--color-outline);
	}

	.ax-button--outline:hover:not(.ax-button--disabled) {
		--ring-color-default: var(--color-primary);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.ax-button--ghost {
		background: transparent;
		color: var(--color-on-surface);
		--ring-color-default: transparent;
	}

	.ax-button--ghost:hover:not(.ax-button--disabled) {
		background: var(--color-surface-container-low);
		--ring-color-default: var(--color-outline-variant);
	}

	.ax-button--link {
		background: transparent;
		color: var(--color-primary);
		border-radius: 0;
		padding: 0 var(--space-1);
		min-height: auto;
		height: auto;
		line-height: inherit;
		/* Link variant with bottom ring */
		--ring-color-default: transparent;
		box-shadow: 0 var(--line-thin) 0 0 var(--ring-color-default);
	}

	.ax-button--link:hover:not(.ax-button--disabled) {
		--ring-color-default: var(--color-primary);
		background: transparent;
	}

	/* Danger variant for admin use */
	.ax-button--danger {
		background: var(--color-error);
		color: var(--color-on-error);
		--ring-color-default: var(--color-error);
	}

	.ax-button--danger:hover:not(.ax-button--disabled) {
		background: var(--color-error-container);
		color: var(--color-on-error-container);
		--ring-color-default: var(--color-error-container);
	}

	/* Loading state */
	.ax-button--loading {
		cursor: wait;
		pointer-events: none;
	}

	.ax-button--loading::after {
		content: '';
		width: 16px;
		height: 16px;
		border: 2px solid currentColor;
		border-radius: 50%;
		border-top-color: transparent;
		animation: spin 1s linear infinite;
		margin-left: var(--space-2);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Disabled state */
	.ax-button--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		filter: grayscale(1);
	}
</style>
