<template>
	<div class="app">
		<nav>
			<ul>
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/about">About</router-link></li>
			</ul>
		</nav>
		<div class="content">
			<router-view />
		</div>
		<footer>
			2019
		</footer>
	</div>
</template>

<style lang="scss">

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		body {
			background:#fafafa;
		}
	}

	.app {
		font-family: 'Montserrat Regular', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		padding: 0;
		margin: 0;

		nav {
			height: 50px;
			padding: 10px 0;
			background: #fff;
			border-bottom: 1px solid #ddd;
			box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.3);
			ul {
				list-style: none;
				max-width: 1200px;
				margin: 0 auto;
				li {
					display: inline-block;
					padding: 5px 10px;
					font-size: 18px;
					a {
						font-weight: bold;
						color: #2c3e50;
						text-decoration: none;

						&.router-link-active {
							color: $highlight-color;
							text-decoration: none;
						}
					}
				}
			}
		}

		.content {
			max-width: 1200px;
			margin: 0 auto;
			padding-top: 20px;
			min-height: calc(100vh - 50px - 30px);
		}

		footer {
			height: 30px;
			line-height: 30px;
			background: $highlight-color;
			color: white;
			text-align: center;
		}
	}
</style>
