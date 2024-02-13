<script lang="ts" type="module">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';
	import { redirect } from '@sveltejs/kit';

	export let form: ActionData;

	let redirectTo: string | undefined = form?.redirectTo;
	let url: string;

	console.log(redirectTo);
	if (redirectTo) {
		if (redirectTo === '/') {
			url = '/#contact-form';
		} else {
			url = redirectTo + '/#contact-form';
		}

		console.log('goto?');
		if (browser) {
			goto(url, { replaceState: true, keepFocus: true });
		}
	} else {
		redirect(303, '/');
	}
</script>

<div class="fixed w-screen h-screen top-0 left-0 bg-neutral z-50" />
