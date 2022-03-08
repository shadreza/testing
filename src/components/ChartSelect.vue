<template>
    <div>
        <p> <strong>{{x_property}}</strong> <small>  vs  </small><strong>{{y_property}}</strong></p>
        <p>select a chart type from the followings</p>
        <div class="charts">
            <div 
                v-for="chart in charts" 
                :key="chart.name" 
                class="chart"
                :id="chart.name === chartToUse && 'selected'"
                @click="selectChart(chart.name)"
            >
                <img :src="chart.image" :alt="chart.name">
                <small>{{chart.name}}</small>
            </div>
        </div>
        <div v-if="chartToUse" class="selected-chart">
            <p><small>the graph is being shown in</small></p>
            <h3>{{chartToUse}}</h3>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex' 

    export default {
        name : "ChartSelect",
        computed : {
            ...mapState(["x_property", "y_property", "charts", "chartToUse"])
        },
        methods : {
            ...mapMutations(["selectChart"]),
        },

    }
</script>

<style scoped>
    .charts {
        width: auto;
        margin: 4rem;
        display: flex;
        justify-content: space-between;
    }
    .chart {
        width: 5%;
        cursor: pointer;
        opacity: 0.5;
    }
    .chart img {
        width: 90%;
    }
    .chart:hover {
        width: 5.5%;
        opacity: 1;
    }
    #selected {
        opacity: 1;
        width: 6%;
    }
    .selected-chart {
        margin-down: 2rem;
    }
</style>