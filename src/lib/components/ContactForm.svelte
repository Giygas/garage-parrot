<script lang="ts">
</script>

<div
	class="contact-background m-4 p-4 md:m-20 md:p-20 md:text-sm text-secondary shadow-xl text-sm md:text-base"
>
	<form action="">
		<div class="flex flex-col gap-4 mx-auto justify-center w-full lg:w-[600px]">
			<div class="flex flex-col lg:flex-row lg:items-center">
				<label for="nom" class="pe-2 w-32">NOM:</label>
				<input
					type="text"
					name="nom"
					class="input input-bordered input-primary input-md grow w-full"
				/>
			</div>
			<div class="flex flex-col lg:flex-row lg:items-center">
				<label for="prenom" class="pe-2 w-32">PRENOM:</label>
				<input
					type="text"
					name="prenom"
					class="input input-bordered input-primary input-md grow w-full"
				/>
			</div>
			<div class="flex flex-col lg:flex-row lg:items-center">
				<label for="email" class="pe-2 w-32">EMAIL:</label>
				<input
					type="email"
					name="email"
					class="input input-bordered input-primary input-md grow w-full"
				/>
			</div>
			<div class="flex flex-col lg:flex-row lg:items-center">
				<label for="telephone" class="pe-2 lg:w-32">NUMERO DE TELEPHONE:</label>
				<input
					type="tel"
					name="telephone"
					class="input input-bordered input-primary input-md grow w-full"
				/>
			</div>
			<div class="flex flex-col gap-2 justify-start mt-4">
				<label for="message" class="pe-2 w-32">MESSAGE:</label>
				<textarea name="message" class="textarea textarea-primary grow w-full h-40" />
			</div>
			<button class="btn btn-accent mt-5 w-full lg:w-40 self-end">ENVOYER</button>
		</div>
	</form>
</div>

<style>
	input,
	textarea {
		background-color: #d9d9d9;
	}

	.contact-background {
		background: #6a655c10;
		border-radius: 20px;
	}
</style>
