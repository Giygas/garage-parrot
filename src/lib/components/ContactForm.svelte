<script lang="ts">
</script>

<div class="flex flex-col w-3/5 gap-4 mx-auto">
	<div class="grid grid-cols-3 gap-1 items-center">
		<label for="nom" class="justify-self-end pe-4">NOM:</label>
		<input type="text" name="nom" class="input input-bordered input-primary input-md col-span-2" />
	</div>
	<div class="grid grid-cols-3 gap-1 items-center">
		<label for="prenom" class="justify-self-end pe-4">PRENOM:</label>
		<input
			type="text"
			name="prenom"
			class="input input-bordered input-primary input-md col-span-2"
		/>
	</div>
	<div class="grid grid-cols-3 gap-1 items-center">
		<label for="email" class="justify-self-end pe-4">EMAIL:</label>
		<input
			type="text"
			name="email"
			class="input input-bordered input-primary input-md col-span-2"
		/>
	</div>
	<div class="grid grid-cols-3 gap-1 items-center">
		<label for="telephone" class="justify-self-end pe-4">NUMERO DE TELEPHONE:</label>
		<input
			type="text"
			name="telephone"
			class="input input-bordered input-primary input-md col-span-2"
		/>
	</div>
	<div class="grid grid-cols-3 gap-1 items-center">
		<label for="message" class="justify-self-end pe-4">MESSAGE: </label>
		<textarea name="message" class="textarea textarea-primary col-span-2 h-40" />
	</div>
</div>

<style>
	input,
	textarea {
		background-color: #d9d9d9;
	}
</style>
