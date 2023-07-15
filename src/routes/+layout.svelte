<script lang="ts">
	import '../app.postcss';
	import { ContactForm, Footer, Navigation } from '$components';

	export let data;
	let days = data;
</script>

<Navigation />

<slot />

<div class="w-full p-0 m-0">
	<h2>Testing this sheet</h2>
	<ContactForm />
</div>
<Footer {days} />
