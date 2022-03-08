<template>
    <div>
        <h3>{{x_property}} vs {{y_property}}</h3>
        <p>select a chart type from the followings</p>
    </div>
</template>

<script>

    import {mapState} from 'vuex' 

    export default {
        name : "ChartSelect",
        computed : {
            ...mapState(["x_property", "y_property"])
        }
    }
</script>

<style scoped>

</style>