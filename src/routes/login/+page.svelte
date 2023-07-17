<!-- used for development testing -->

<script lang="ts">
	import type { LayoutServerData } from "./$types";
	import type { PageData, ActionData } from './$types';

	import { fail } from '@sveltejs/kit'
	export let data: LayoutServerData;

	// if (data.failure) {
	// 		return fail(400, { 'wrong password': data.failure.errorMessage });
	// 	}
</script>

<div class="container">
	<h1 class="is-size-3 has-text-weight-semibold my-4">Login or Register</h1>
	<!-- <form bind:this={form} > -->
	<form method="POST">
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
		{#if data.failure}
			<div class="has-text-danger my-2">{data.failure.errorMessage}</div>
		{/if}

		<button
			class="button is-primary mt-4"
			type="submit"
			formaction="/registerValidate">Register</button
		>
		<button
			class="button is-primary mt-4"
			type="submit"
			formaction="/loginValidate">Login</button
		>
	</form>
</div>
<slot />
