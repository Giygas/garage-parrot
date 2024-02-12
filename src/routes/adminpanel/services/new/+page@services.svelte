<h1 class="montserrat text-accent text-small-caps text-3xl font-semibold">
	Ajouter un nouveau service
</h1>
<div class="flex flex-col w-full">
	<form method="POST" action="/adminpanel/services?/newService">
		<div class="flex flex-col min-w-full h-fit gap-6 pt-12">
			<div class="grid grid-cols-5 gap-5 items-center">
				<div class="col-span-1 text-end">
					<label for="title" class="uppercase items-end justify-end text-lg">Titre:</label>
				</div>
				<div class="col-span-4">
					<input type="text" name="title" class="input input-primary w-full text-lg bg-primary/5" />
				</div>
			</div>

			<div class="grid grid-cols-5 gap-5">
				<div class="col-span-1 text-end">
					<label for="description" class="uppercase text-lg">Paragraphe:</label>
				</div>
				<div class="col-span-4">
					<textarea
						name="description"
						class="textarea textarea-primary grow bg-primary/5 w-full h-44 text-lg"
					/>
				</div>
			</div>
		</div>

		<div class="flex gap-2 justify-end mt-2">
			<button class="btn btn-accent w-fit"> Sauvegarder</button>
		</div>
	</form>
</div>
