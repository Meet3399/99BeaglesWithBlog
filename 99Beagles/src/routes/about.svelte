<script>
	import { onMount } from "svelte";
	import { goto } from '@sapper/app';
	import {token} from './store';
	let jwt;
	let d;
	token.subscribe(value=>{
		jwt = value
	});
	const proxyUrl = "https://still-taiga-46464.herokuapp.com/";
	const targetUrl ="https://www.99beagles.com/api/v2/pages/?type=blog.BlogPage&fields=body";
	onMount(async ()=>{
		if(jwt){
	try{
	const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
	  body: JSON.stringify({"token" : jwt.accessToken.jwtToken})
    })
	JSON.stringify(response)
	d = await response.json();
	// const response1 = await fetch( targetUrl);
	// JSON.stringify(response1)
	// data = await response1.json();
	// console.log(data);
	}
	catch(error){
		console.log(error)
	}
		}
	else{
		goto('/login');
	}
	})

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

</script>

<svelte:head>
	<title>99beagles</title>
</svelte:head>

<h1>Blog</h1>
	{d}
<!-- {#each data.items[0].body as data}
{@html data.value}
{/each} -->
