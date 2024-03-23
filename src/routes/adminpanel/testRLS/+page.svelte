<script lang="ts">
	export let data;

	console.log('-------------------------------------');
	const getUser = data.supabase.auth.getUser().then((data) => console.log(data));
	console.log('-------------------------------------');
</script>

{getUser}
