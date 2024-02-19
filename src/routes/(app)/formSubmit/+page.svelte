<script lang="ts" type="module">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let redirectTo = form?.redirectTo as string;

	if (browser) {
		goto(redirectTo, { replaceState: true });
	}
</script>

<div class="absolute w-full h-full top-0 left-0 bg-neutral z-50" />
