import type { Snippet } from 'svelte';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	href?: string;
	type?: 'button' | 'submit' | 'reset';
	fullWidth?: boolean;
	icon?: boolean;
	onclick?: (e: Event) => void;
	class?: string;
	children?: Snippet;
}
