<script>
	import { onMount } from "svelte";
	import { goto } from '@sapper/app';
	import {token} from './store';
	let jwt;
	token.subscribe(value=>{
		jwt = value
	});
	// const proxyUrl = "https://still-taiga-46464.herokuapp.com/";
	onMount(async ()=>{
		const start = new Date().getTime()
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
				data = await response.json();
				console.log(new Date().getTime() - start, 'ms')
			}
			catch(error){
				console.log(error)
			}
		}
		else{
		}
	})

	let data = {
		items: [
			{
				body: [
					{
						value: "Please Login To See the Blogs",
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

{#each data.items[0].body as data}
{@html data.value}
{/each}
