<template>
    <div class="home-page-div">
        <h2 class="title">Charts</h2>

        <div class="select-a-table">
            <ChooseTable />
        </div>

        <br>

        <div v-if="isTableChosen" class="selecting-charts">
            <ChartSelect v-if="isTableChosen" />
        </div>

        <br>
        <br>

        <div v-if="isTableChosen && chartToUse" class="selecting-axis-properties-div">
            <SelectingAxisComponent tagName="X" />
            <SelectingAxisComponent tagName="Y" />
        </div>       

        <br>
        <br>

        <div v-if="isTableChosen && chartToUse && x_property && y_property" class="chart" :key="toggler">
            <D3Tes v-if="isTableChosen && chartToUse && x_property && y_property" :key="toggler" />
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
        },
    }
</script>

<style scoped>
    .home-page-div {
        margin-bottom: 10rem ;
    }
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