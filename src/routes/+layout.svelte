<script lang="ts">
	import '../app.postcss';
	import { ContactForm, Footer, Navigation } from '$components';
	import type { Weekdays } from '$lib/types';
	export let data;
	let days: Weekdays = data.days;

	// Preload fonts
	import { onMount } from 'svelte';

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.href = 'fonts.css';
		link.as = 'style';
		link.onload = () => {
			link.onload = null;
			link.rel = 'stylesheet';
		};
		document.head.appendChild(link);
	});
</script>

<head>
	<link rel="stylesheet" href="fonts.css" />
</head>

<Navigation />
<div id="contents" class="container mx-auto">
	<slot />

	<div class="w-full p-0 m-0">
		<ContactForm />
	</div>
</div>
<Footer {days} />
