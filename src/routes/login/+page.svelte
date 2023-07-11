<script>
	import { onMount } from 'svelte';
	let form;
	onMount(() => {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			const formData = new FormData(form);
			fetch('/test', {
				method: 'POST',
				body: formData
			})
				.then(function (response) {
					if (response.ok) {
						return response.text();
					} else {
						throw new Error('Error: ' + response.status);
					}
				})
				// .then(function (responseData) {
				// 	// console.log(responseData);
				// })
				// .catch(function (error) {
				// 	console.log('Error:', error);
				// });
		});
	});





    // //still need to create this
    // import type { ActionData } from './$types.js';
    // // import type { RequestEvent } from '../$types.js';
    // // receive form data from server
    // export let form: ActionData;

    // // export let form: RequestEvent;
  </script>
  
  <div class="container">
    <h1 class="is-size-3 has-text-weight-semibold my-4">Login or Register</h1>
    <form bind:this={form} >
      <!-- <input class="input my-2" type="text" placeholder="Username" name="username" required>Michael</input> -->
      <input class="input my-2" type="text" placeholder="Username" name="username" required />
      <input class="input my-2" type="password" placeholder="Password" name="password" required />
      
      <!-- display error message, if errorMessage is thrown by fail() function in src/routes/login/+page.server.ts-->
      {#if form?.errorMessage}
        <div class="has-text-danger my-2">{form.errorMessage}</div>
      {/if}
  
      <!-- <button class="button mt-4 mr-3" type="submit" formaction="?/register">Register</button> -->
      <!-- <a href="/register"> Register </a> -->
      <button class="button is-primary mt-4" type="submit" formaction="?/register">Register</button>
      <button class="button is-primary mt-4" type="submit" >Login</button>
    </form>
  </div>
  <slot/>