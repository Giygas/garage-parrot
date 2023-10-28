<script lang="ts">
	import { Review } from '$components';
	import type { ReviewType } from '../types';
	// Mock element for Review
	export let reviews: ReviewType;
	// Mock end
</script>

<div
	class="container review-container flex flex-row shrink-0 overflow-x-auto no-scrollbar snap-x snap-mandatory justify-start gap-8 p-5"
>
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
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
