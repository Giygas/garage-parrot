<script lang="ts">
	import { Review } from '$components';
	import type { ReviewType } from '../types';
	// Mock element for Review
	export let reviews: ReviewType;
	// Mock end
</script>

<div
	class="container review-container flex flex-row shrink-0 overflow-x-auto snap-x snap-mandatory justify-start gap-8 p-5"
>
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
	<Review {...reviews} />
</div>
