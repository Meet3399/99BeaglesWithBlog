<script>
	import { goto } from "@sapper/app";
	import { onMount } from "svelte";
	import { token, userName } from "./store";
	let jwt;
	let data= {
		name: ''
	};
	token.subscribe((value) => {
		jwt = value;
	});
	const goToBlog = () => {
		goto("/login");
	};
	onMount(async () => {
		const start = new Date().getTime()
		if (jwt) {
			// jwt = JSON.parse(jwt)
			console.log(jwt)
			try {
				const response = await fetch("/username", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({ token: jwt.idToken.jwtToken }),
				});
				data = await response.json();
				userName.set(data.name);
				console.log(new Date().getTime() - start, "ms");
			} catch (error) {
				console.log(error);
			}
		}
	});
</script>

<style>
	/* @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"); */
	/* h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	} */
</style>

<svelte:head>
	<title>99 Beagles</title>
</svelte:head>
<button on:click|preventDefault={goToBlog}>Go to Login</button>
