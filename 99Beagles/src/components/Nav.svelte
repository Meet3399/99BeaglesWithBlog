<script>
	export let segment;
	import { token, userName } from "../routes/store";
	let jwt;
	let name;
	let selected;
	export let navItems;
	import {
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
	} from "sveltestrap";
	let isOpen = false;

	token.subscribe((value) => {
		jwt = value;
	});
	userName.subscribe((value) => {
		name = value;
	});
</script>

<style>
	@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: "";
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	select {
		border: none;
		/* color: #007bff; */
		padding: 19px 11px;
		font-size: 16px;
		display: block;
		text-align: left;
		font-weight: 300;
		width: 110px;
	}
	Dropdown {
		padding: 19px 11px;
		font-size: 16px;
		display: block;
		text-align: left;
		font-weight: 300;
		border: none;
		/* width: 110px; */
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}

	a {
		color: inherit;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	/* p {
		display: inline;
		float: right;
		font-weight: bolder !important;
		font-family: cursive;
	} */
</style>

<nav>
	<ul>
		{#each navItems as nav}
			<!-- {console.log(index,nav)} -->

			{#if !Array.isArray(nav)}
				{#if nav.navItem === 'Login'}
					{#if !jwt}
						<!-- {console.log("Coming in if block")} -->
						<li>
							<a
								aria-current={segment === nav.current ? 'page' : undefined}
								href={nav.navLink}>{nav.navItem}</a>
						</li>
					{/if}
				{:else if nav.navItem === 'Logout'}
					{#if jwt}
						<li>
							<a
								aria-current={segment === nav.current ? 'page' : undefined}
								href={nav.navLink}>{nav.navItem}</a>
						</li>
					{/if}
				{:else}
					<!-- {console.log("Coming in else block")} -->
					<li>
						<a
							aria-current={segment === nav.current ? 'page' : undefined}
							href={nav.navLink}>{nav.navItem}</a>
					</li>
				{/if}
			{:else}
				<li>
					<Dropdown style='padding: 11px 6px;font-size: 16px;font-weight: 300;border: none;' {isOpen} toggle={() => (isOpen = !isOpen)}>
						<DropdownToggle style='color: black!important;background-color:white!important;font-weight:300;border:none;border:color: none!important' caret>{nav[0].navItem}</DropdownToggle>
						<DropdownMenu>
							{#each nav as n}
								<!-- svelte-ignore empty-block -->
								{#if n.hasSubNav}
								{:else}
									<DropdownItem>
										<a href={n.navLink}>{n.navItem}</a>
									</DropdownItem>
								{/if}
							{/each}
						</DropdownMenu>
					</Dropdown>
				</li>
			{/if}
		{/each}

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li> -->

		{#if jwt}
			<p>Hey, {name}</p>
		{/if}
	</ul>
</nav>
