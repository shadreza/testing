<template>
    <div>
        <svg id="chartZone"></svg>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: 'ChartShowcase',
        computed : {
            ...mapState(["dataArray", "x_property", "y_property"])
        },
    }
</script>

<style scoped>

</style>