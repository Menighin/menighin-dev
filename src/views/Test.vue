<template>
    <div>
        <br>
        <br>
        <h1>{{msg}} {{testProp}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Test',
    props: {
        msg: {type: String, required: true}
	},
	data() {
		return {
			testProp: ''
		}
	},
	methods: {
		sayHi() {
			this.testProp = 'said it!';
		}
	}
}
</script>

<style>

</style>
