<script lang="ts">
	// Individual component will reveive the name, rating and message
	// as a prop
	export let name: String;
	export let rating: Number;
	export let message: String;
</script>

<div class="p-6 bg-primary/80 rounded-lg min-w-[340px]">
	<div class="flex flex-row shrink-0 justify-between">
		<div class="uppercase text-xl font-medium">{name}</div>
		<div class="justify-self-end">{rating}</div>
	</div>
	<div class="flex text-justify p-2">
		{message}
	</div>
</div>
