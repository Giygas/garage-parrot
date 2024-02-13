<script lang="ts" type="module">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let redirectTo = form?.redirectTo;
	let isRating = form?.rating;
	let url: string;

	if (redirectTo) {
		if (isRating) {
			url = redirectTo;
		} else {
			if (redirectTo === '/') {
				url = '/#contact-form';
			} else {
				url = redirectTo + '/#contact-form';
			}
		}
	} else {
		url = '/';
	}
	if (browser) {
		goto(url, { replaceState: true, keepFocus: true });
	}
</script>

<div class="absolute w-full h-full top-0 left-0 bg-neutral z-50" />
