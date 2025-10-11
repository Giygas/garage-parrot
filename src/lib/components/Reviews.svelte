<script lang="ts">
	import { Review } from '$components';
	import type { ReviewType } from '$lib/types';
	import { onMount } from 'svelte';

	export let reviews: Array<ReviewType>;
	let container: HTMLElement;
	let canScrollLeft = false;
	let canScrollRight = false;
	let hasOverflow = false;
	let reviewWidth = 0;

	function checkScrollButtons() {
		if (container) {
			const overflowAmount = container.scrollWidth - container.clientWidth;
			// Only consider it overflow if there's at least 50px of hidden content
			hasOverflow = overflowAmount > 50;
			canScrollLeft = container.scrollLeft > 0;
			canScrollRight = container.scrollLeft < overflowAmount;

			// Calculate review width based on first review element
			const firstReview = container.querySelector('[data-review]');
			if (firstReview) {
				const reviewStyle = window.getComputedStyle(firstReview);
				const reviewMargin = parseFloat(reviewStyle.marginRight) || 0;
				reviewWidth = firstReview.clientWidth + reviewMargin;
			}
		}
	}

	function scrollLeft() {
		if (reviewWidth > 0) {
			container.scrollBy({ left: -reviewWidth, behavior: 'smooth' });
		}
	}

	function scrollRight() {
		if (reviewWidth > 0) {
			container.scrollBy({ left: reviewWidth, behavior: 'smooth' });
		}
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

<div class="relative max-w-[1200px] mx-auto">
	{#if hasOverflow}
		<button
			on:click={scrollLeft}
			class="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 z-20 text-accent hover:text-red-700 transition-all duration-200 {canScrollLeft
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			aria-label="Scroll reviews left"
		>
			<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
				<path d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			on:click={scrollRight}
			class="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 z-20 text-accent hover:text-red-700 transition-all duration-200 {canScrollRight
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			aria-label="Scroll reviews right"
		>
			<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
				<path d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	<div
		bind:this={container}
		class="w-full flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory justify-start gap-8 px-5 lg:px-7 py-5"
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
