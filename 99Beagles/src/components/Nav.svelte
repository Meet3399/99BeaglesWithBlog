
<script>
	export let segment;
	import { token, userName } from "../routes/store";
	let jwt;
	let name;
	export let navItems;
	
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

	select{
		/* position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block; */
		/* bottom: -1px; */
		border: none;
		width: 100px;
		position: relative;
		top:15px;
		margin: 5px;

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
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	p {
		display: inline;
		float: right;
		font-weight: bolder !important;
		font-family: cursive;
	}
</style>

<nav>
	<ul>
		{#each navItems as nav,index }
			
				<!-- {console.log(index,nav)} -->
			
				{#if !Array.isArray(nav)}
					{#if nav.navItem === 'Login'}
						{#if !jwt}
							<!-- {console.log("Coming in if block")} -->
							<li>
							<a aria-current={segment === nav.current ? 'page' : undefined}
							href={nav.navLink}>{nav.navItem}</a>
							</li>
						{/if}
					{:else if nav.navItem === 'Logout'}
						{#if jwt}
							<!-- {console.log("Coming in else if block")} -->
							<li>
								<a aria-current={segment === nav.current ? 'page' : undefined}
								href={nav.navLink}>{nav.navItem}</a>
							</li>
						{/if}
					{:else}
						<!-- {console.log("Coming in else block")} -->
						<li>
							<a aria-current={segment === nav.current ? 'page' : undefined}
							href={nav.navLink}>{nav.navItem}</a>
						</li>
					{/if}
				{:else}
					<li>
						<select>
							{#each nav as n}
								<option>{n.navItem}</option>
							{/each}
						</select>
					</li>
					<!-- <select>
						{#each nav as navOptions}
							{#if navOptions.subnav}
								<option>
									<a href={navOptions.navLink}>{navOptions.navItem}</a>
								</option>
							{:else}
								<option>{navOptions.navItem}</option>
							{/if}
						{/each} 
					</select>						 -->
				{/if}
			{/each}
		<!-- <li>
			<a
				aria-current={segment === undefined ? 'page' : undefined}
				href="/">Home</a>
		</li>
		<li>
			<a
				aria-current={segment === 'about' ? 'page' : undefined}
				href="/about">Blog</a>
		</li>
		{#if !jwt}
			<li>
				<a
					aria-current={segment === 'login' ? 'page' : undefined}
					href="/login">Login</a>
			</li>
		{:else}
			<li>
				<a
					aria-current={segment === 'logout' ? 'page' : undefined}
					href="/logout">Logout</a>
			</li>
		{/if} -->

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li> -->

		{#if jwt}
			<p>Hey, {name}</p>
		{/if}
	</ul>
</nav>
