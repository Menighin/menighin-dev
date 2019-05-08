<template>
    <router-view :key="$route.name + ($route.params.lang || '')" />
</template>

<script>
export default {

}
</script>

<style>

</style>
