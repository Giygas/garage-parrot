<script lang="ts">
	import { Review } from '$components';

	// Mock element for Review
	export let revi = {
		name: 'Pedro',
		rating: 5,
		message:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro rerum ipsum sequi error saepe	doloribus natus omnis iusto. Omnis, voluptatibus nihil et ut laboriosam tenetur! Quos, laboresit voluptates unde tempore molestiae dolore soluta quaerat est iure libero alias rerum. Quia architecto voluptates cupiditate aut autem sint tempora ad labore.'
	};
	// Mock end
</script>

<div
	class="container review-container flex flex-row shrink-0 overflow-x-auto snap-x snap-mandatory justify-start gap-8 p-5"
>
	<Review {...revi} />
	<Review {...revi} />
	<Review {...revi} />
	<Review {...revi} />
</div>
