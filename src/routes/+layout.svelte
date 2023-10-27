<script lang="ts">
	import '../app.postcss';
	import { ContactForm, Footer, Navigation } from '$components';
	import type { Weekdays } from '$lib/types';
	export let data;
	let days: Weekdays = data.days;
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
