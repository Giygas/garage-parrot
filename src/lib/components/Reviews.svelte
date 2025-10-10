<script lang="ts">
	import { Review } from '$components';
	import type { ReviewType } from '$lib/types';
	import { onMount } from 'svelte';

	export let reviews: Array<ReviewType>;
	let container: HTMLElement;
	let canScrollLeft = false;
	let canScrollRight = false;
	let hasOverflow = false;

	function checkScrollButtons() {
		if (container) {
			const overflowAmount = container.scrollWidth - container.clientWidth;
			// Only consider it overflow if there's at least 50px of hidden content
			hasOverflow = overflowAmount > 50;
			canScrollLeft = container.scrollLeft > 0;
			canScrollRight = container.scrollLeft < overflowAmount;
		}
	}

	function scrollLeft() {
		container.scrollBy({ left: -300, behavior: 'smooth' });
	}

	function scrollRight() {
		container.scrollBy({ left: 300, behavior: 'smooth' });
	}

	onMount(() => {
		checkScrollButtons();
		container.addEventListener('scroll', checkScrollButtons);
		window.addEventListener('resize', checkScrollButtons);
		return () => {
			container.removeEventListener('scroll', checkScrollButtons);
			window.removeEventListener('resize', checkScrollButtons);
		};
	});
</script>

<div class="relative">
	{#if hasOverflow}
		<button
			on:click={scrollLeft}
			class="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-accent p-3 rounded-full shadow-lg transition-all duration-200 {canScrollLeft
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			aria-label="Scroll reviews left"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			on:click={scrollRight}
			class="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-accent p-3 rounded-full shadow-lg transition-all duration-200 {canScrollRight
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			aria-label="Scroll reviews right"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	<div
		bind:this={container}
		class="container min-w-full flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory justify-start gap-8 p-5 lg:px-16"
		on:scroll={(e) => e.stopPropagation()}
	>
		{#each reviews as rv}
			<Review {rv} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
