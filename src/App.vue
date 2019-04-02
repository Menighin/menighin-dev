<template>
	<div class="app">
		<div class="nav">
			<ul>
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/about">About</router-link></li>
			</ul>
		</div>
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>

<style lang="scss">

	* {
		padding: 0;
		margin: 0;
	}

	.app {
		font-family: 'Montserrat', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		padding: 0;
		margin: 0;

		.nav {
			background-color: #ccc;
			padding: 10px 0;
			ul {
				list-style: none;
				max-width: 1200px;
				margin: 0 auto;
				li {
					display: inline-block;
					padding: 5px 10px;
					a {
						font-weight: bold;
						color: #2c3e50;
						&.router-link-exact-active {
							color: #42b983;
						}
					}
				}
			}
		}

		.content {
			max-width: 1200px;
			margin: 0 auto;
		}

	}

	@import url('https://fonts.googleapis.com/css?family=Montserrat');
	
</style>
