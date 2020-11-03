<script>
	import { onMount } from "svelte";
	let data = {
		items: [
			{
				body: [
					{
						value: "",
					},
				],
			},
		],
	};
	const proxyUrl = "https://still-taiga-46464.herokuapp.com/";
	const targetUrl =
		"https://www.99beagles.com/api/v2/pages/?type=blog.BlogPage&fields=body";
	onMount(async () => {
		try {
			const response = await fetch(proxyUrl + targetUrl);
			data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
			data = error;
		}
	});
</script>

<svelte:head>
	<title>99beagles</title>
</svelte:head>

<h1>Blog</h1>

{#each data.items[0].body as data}
{@html data.value}
{/each}
