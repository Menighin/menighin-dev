<template>
    <div>
        <br>
        <br>
        <h1>{{msg}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Test',
    props: {
        msg: {type: String, required: true}
    }
}
</script>

<style>

</style>
