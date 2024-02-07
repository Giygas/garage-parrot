<script>
	import { goto } from '$app/navigation';

	export let data;
	let { session, supabase } = data;
	$: {
		session, supabase;
	}

	const disconnect = async () => {
		await supabase.auth.signOut();
		goto('/login');
	};
</script>

It works
<button on:click={disconnect}>Disconnect</button>
