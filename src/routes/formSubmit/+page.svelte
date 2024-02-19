<script lang="ts" type="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';

	export let form: ActionData;

	let redirectTo = form?.redirectTo as string;

	afterNavigate(() => {
		if (form) {
			if (form?.success) {
				toast.success(form.message);
			} else {
				toast.error(form.message);
			}
		}
	});

	if (browser) {
		goto(redirectTo, { replaceState: true });
	}
</script>
