<script lang="ts" type="module">
	import { afterNavigate, goto, replaceState } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let redirectTo: string | undefined = form?.redirectTo as string;
	let url: string;

	afterNavigate(() => {
		replaceState('', url);
	});

	if (redirectTo === '/') {
		url = '/#contact-form';
	} else {
		url = redirectTo + '/#contact-form';
	}

	if (browser) {
		goto(url, { replaceState: true, keepFocus: true });
	}
</script>
