<script lang="ts">
	import { Review } from '$components';
	import type { ReviewType } from '$lib/types';
	export let reviews: Array<ReviewType>;
</script>

<div
	class="container min-w-full flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory justify-start gap-8 p-5"
>
	{#each reviews as rv}
		<Review {rv} />
	{/each}
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
