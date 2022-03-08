<template>
    <div>
        <h2>Charts</h2>
        <div class="selecting-axis-properties-div">
            <SelectingAxisComponent tagName="X"/>
            <SelectingAxisComponent tagName="Y"/>
        </div>
        <br>
        <br>
        <div class="selecting-charts">
            <ChartSelect v-if="x_property && y_property" />
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import SelectingAxisComponent from '../components/SelectingAxisComponent'
    import ChartSelect from '../components/ChartSelect'

    export default {
        name : 'HomePage',
        components : {
            SelectingAxisComponent,
            ChartSelect,
        },
        computed : {
            ...mapState(["dataArray", "x_property", "y_property"])
        }
    }
</script>

<style scoped>
    .selecting-axis-properties-div {
        display: block;
        margin: 4rem;
    }
    .selecting-charts {
        margin : 2rem;
    }
</style>