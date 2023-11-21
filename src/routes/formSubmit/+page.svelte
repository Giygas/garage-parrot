<script lang="ts">
	import type { ActionData } from '../$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let form: ActionData;
	console.log(form);
	if (browser) {
		goto('/');
	}
</script>
