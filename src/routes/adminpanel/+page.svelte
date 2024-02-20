<script>
	export let data;
	let { session, supabase } = data;
	$: {
		session, supabase;
	}
</script>

<div class="w-full">content here</div>
