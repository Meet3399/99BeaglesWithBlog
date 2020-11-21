<script context="module">
export async function preload(){
	// const start = new Date().getTime();
	const proxyUrl = "https://still-taiga-46464.herokuapp.com/";
	const response  = await this.fetch ('https://www.99beagles.com/api/v2/menus/')
	
	const data = await response.json();
	const navItems = []
	// console.log(data , new Date().getTime() - start , "ms");
	for (let i = 0; i < data[0].menu.length; i++) {
			if (data[0].menu[i].type === "nav_category") {
				const navCategoryData = [{
					navItem: data[0].menu[i].value.title,
					hasSubNav: true,
					current: 'title'
				}]
				for(let j=0;j<data[0].menu[i].value.sub_nav.length;j++){
					const navBarData = {
						navItem: data[0].menu[i].value.sub_nav[j].value.override_title,
						navLink: data[0].menu[i].value.sub_nav[j].value.link,
						subNav: true,
					}
					navCategoryData.push(navBarData);
				}
				navItems.push(navCategoryData)
			} else {
				const navBarData = {
					navItem: data[0].menu[i].value.override_title,
					current: data[0].menu[i].value.override_title.toLowerCase(),
					navLink: data[0].menu[i].value.link,
					hasSubNav:  false
				};
				navItems.push(navBarData);
			}
		}
		// 	
	return {navItems}
}
</script>

<script>
	import Nav from '../components/Nav.svelte';
	export let navItems
	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}{navItems} />

<main>
	<slot></slot>
</main>