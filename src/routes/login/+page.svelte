<script lang="ts">
	// import { onMount } from 'svelte';
	// let form;
	// onMount(() => {
	// 	form.addEventListener('submit', function (event) {
	// 		event.preventDefault();
	// 		const formData = new FormData(form);
	// 		fetch('/test', {
	// 			method: 'POST',
	// 			body: formData
	// 		})
	// 			.then(function (response) {
	// 				if (response.ok) {

	// 					return response.text();
	// 				} else {
	// 					throw new Error('Error: ' + response.status);
	// 				}
	// 			})

	// 	});
	// });

    // //still need to create this
    // import type { ActionData } from './$types.js';

    // // receive form data from server
    // export let form: ActionData;
  </script>

<div class="container">
	<h1 class="is-size-3 has-text-weight-semibold my-4">Login or Register</h1>
	<!-- <form bind:this={form} > -->
	<form method="POST" >
		<input
			class="input my-2"
			type="text"
			placeholder="Username"
			name="username"
			required
		/>
		<input
			class="input my-2"
			type="password"
			placeholder="Password"
			name="password"
			required
		/>

		<!-- display error message, if errorMessage is thrown by fail() function in src/routes/login/+page.server.ts-->
		<!-- {#if form?.errorMessage}
			<div class="has-text-danger my-2">{form.errorMessage}</div>
		{/if} -->

		<button
			class="button is-primary mt-4"
			type="submit"
			formaction="/registerValidate">Register</button
		>
		<button
			class="button is-primary mt-4"
			type="submit"
			formaction="/loginValidate"
			>Login</button
		>
	</form>
</div>
<slot />
