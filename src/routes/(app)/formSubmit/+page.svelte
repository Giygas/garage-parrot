<script lang="ts" type="module">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let redirectTo: string | undefined = form?.redirectTo as string;
	let url: string;
	if (redirectTo === '/') {
		url = '/#contact-form';
	} else {
		url = redirectTo + '/#contact-form';
	}

	if (browser) {
		goto(url, { replaceState: true });
	}
</script>
