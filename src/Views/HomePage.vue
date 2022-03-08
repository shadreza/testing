<template>
    <div>
        <h2 class="title">Charts</h2>
        <div class="selecting-axis-properties-div">
            <SelectingAxisComponent tagName="X"/>
            <SelectingAxisComponent tagName="Y"/>
        </div>
        <br>
        <br>
        <div class="selecting-charts">
            <ChartSelect v-if="x_property && y_property" />
        </div>
        <br>
        <br>
        <div class="chart">
            <ChartShowcase v-if="chartToUse" :key="toggler" />
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import SelectingAxisComponent from '../components/SelectingAxisComponent'
    import ChartSelect from '../components/ChartSelect'
    import ChartShowcase from '../components/ChartShowcase'

    export default {
        name : 'HomePage',
        components : {
            SelectingAxisComponent,
            ChartSelect,
            ChartShowcase,
        },
        computed : {
            ...mapState(["dataArray", "x_property", "y_property", "chartToUse", "toggler"])
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
    .title {
        color: #42b883;
    }
</style>