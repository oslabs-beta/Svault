<!-- used for development testing -->

<script lang="ts">
	import type { LayoutServerData } from "./$types";

	export let data: LayoutServerData;
</script>

<div>
	<h1>Login or Register</h1>
	<form method="POST">
		<input
		type="text"
		placeholder="Username"
		name="username"
		required
		/>
		<input
		type="password"
		placeholder="Password"
		name="password"
		required
		/>
		
		<!-- display error message, if errorMessage is thrown by function in src/lib/login/nativeAuth.ts-->
		<!-- TODO: have failure errorMessage be dynamic, currently will only be "Invalid username or password"-->
		<!-- TODO: change the div that pops up on invalid login to utilize the "fail" functionality that sveltekit provides -->
		{#if data.failure}
			<div>{data.failure}</div>
		{/if}
		
		<button
			type="submit"
			formaction="/registerValidate">Register</button
		>
		<button		
			type="submit"
			formaction="/loginValidate">Login</button
		>
	</form>
</div>
<slot />
