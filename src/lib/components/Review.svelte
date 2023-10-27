<script lang="ts">
	// Individual component will reveive the name, rating and message
	// as a prop
	export let name: String;
	export let rating: Number;
	export let message: String;
</script>

<div class="review p-6 bg-primary/80 rounded-lg min-w-[340px] snap-center">
	<div class="flex flex-row shrink-0 justify-between">
		<div class="uppercase text-xl text-base-100 font-semibold">{name}</div>
		<div class="justify-self-end">{rating}</div>
	</div>
	<div class="flex text-justify p-2 pt-4 font-normal text-base-100 text-base">
		{message}
	</div>
</div>
