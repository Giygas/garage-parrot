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

<div class="ml-96">
	It works <button on:click={disconnect}>Disconnect</button>
</div>
