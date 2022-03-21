<template>
    <div>
        <h2 class="title">Charts</h2>
        <div class="select-a-table">
            <ChooseTable />
        </div>
        <div v-if="isTableChosen" class="selecting-axis-properties-div">
            <SelectingAxisComponent tagName="X"/>
            <SelectingAxisComponent tagName="Y"/>
        </div>
        <br>
        <br>
        <div v-if="isTableChosen" class="selecting-charts">
            <ChartSelect v-if="x_property && y_property" />
        </div>
        <br>
        <br>
        <div v-if="isTableChosen" class="chart" :key="toggler">
            <D3Tes v-if="chartToUse" :key="toggler" />
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import SelectingAxisComponent from '../components/SelectingAxisComponent'
    import ChartSelect from '../components/ChartSelect'
    import D3Tes from '../components/D3Tes'
    import ChooseTable from '../components/ChooseTable.vue'

    export default {
        name : 'HomePage',
        components : {
            SelectingAxisComponent,
            ChartSelect,
            D3Tes,
            ChooseTable
        },
        computed : {
            ...mapState(["dataArray", "x_property", "y_property", "chartToUse", "toggler", "isTableChosen"])
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