<template>
	<div id="app">
		<div id="nav">
			<ul>
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/about">About</router-link></li>
			</ul>
		</div>
		<router-view/>
	</div>
</template>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		max-width: 1200px;
		margin: 0 auto;
	}
	#nav {
		background-color: #ccc;
		ul {
			list-style: none;
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
</style>
