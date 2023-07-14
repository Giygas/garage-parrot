<script lang="ts">
	import ContactForm from '$components/ContactForm.svelte';
	import '../app.postcss';

	import Footer from '$components/Footer.svelte';
	import Navigation from '$components/Navigation.svelte';

	export let data;
	let days = data;
</script>

<Navigation />

<slot />

<div class="w-full p-0 m-0">
	<ContactForm />
</div>
<Footer {days} />
