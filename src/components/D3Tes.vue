<template>
    <div>
        <svg id="svg_zone"></svg>
        <div class="right-panel">
            <h4>Change the Chart Properties</h4>
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-x-label" 
                v-model="currentPropertiesForChart.showXLabel" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-x-label"
            > 
                X Axis Name 
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-y-label" 
                v-model="currentPropertiesForChart.showYLabel" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-y-label"
            > 
                Y Axis Name
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-x-legend" 
                v-model="currentPropertiesForChart.showXLegend" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-x-legend"
            > 
                X Axis
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-y-legend" 
                v-model="currentPropertiesForChart.showYLegend" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-y-legend"
            > 
                Y Axis 
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                type="checkbox" 
                id="show-values-on-chart" 
                v-model="currentPropertiesForChart.showValuesOnChart" 
                @change="toggleToggler()"
            >
            <label 
                for="show-values-on-chart"
            > 
                Values On Chart 
            </label>
            <br><br>
            <input 
                type="checkbox" 
                id="show-title" 
                v-model="currentPropertiesForChart.showTitle" 
                @change="toggleToggler()"
            >
            <label 
                for="show-title"
            > 
                Title 
            </label>
            <br><br>
            <label 
                for="set-title"
            > 
                Set Title 
            </label>
            <input 
                type="text" 
                id="set-title" 
                v-model="currentPropertiesForChart.setTitle" 
                @change="toggleToggler()"
                placeholder="give a title"
            >
            <br><br>
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="colorPicker"
            > 
                Color For Chart 
            </label>
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="color" 
                id="colorPicker" 
                v-model="currentPropertiesForChart.colorForChart" 
                @change="toggleToggler()"
            >
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <label 
                v-if="isAreaChart" 
                for="opacity"
            > 
                Opacity 
            </label>
            <input 
                v-if="isAreaChart" 
                type="number" 
                id="opacity" 
                v-model="currentPropertiesForChart.opacity" 
                placeholder="set the opacity"
                @change="toggleToggler()"
            >
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <label v-if="isRadiusNeeded" for="radius"> Point Radius </label>
            <input v-if="isRadiusNeeded" id="radius" type="number" v-model="currentPropertiesForChart.radiusOfPoint" placeholder=" set the point radius " @change="toggleToggler()">
            <br v-if="isRadiusNeeded"><br v-if="isRadiusNeeded">
            <label v-if="!isTheChartPieOrDoughnut" for="max-width"> Width </label>
            <input v-if="!isTheChartPieOrDoughnut" id="max-width" type="number" v-model="currentPropertiesForChart.widthForChart" placeholder=" set the width of chart " @change="toggleToggler()">
            <br v-if="!isTheChartPieOrDoughnut" ><br v-if="!isTheChartPieOrDoughnut" >
            <label v-if="!isTheChartPieOrDoughnut" for="max-height"> Height </label>
            <input v-if="!isTheChartPieOrDoughnut" id="max-height" type="number" v-model="currentPropertiesForChart.heightForChart" placeholder=" set the height of chart " @change="toggleToggler()">
            <br v-if="!isTheChartPieOrDoughnut" ><br v-if="!isTheChartPieOrDoughnut" >
            <label v-if="isTheChartPieOrDoughnut" for="max-radius"> Radius </label>
            <input v-if="isTheChartPieOrDoughnut" id="max-radius" type="number" v-model="currentPropertiesForChart.radiusOfPieOrDoughnut" placeholder=" set the height of chart " @change="toggleToggler()">
            <br v-if="isTheChartPieOrDoughnut" ><br v-if="!isTheChartPieOrDoughnut" >
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex'
    import {render_vertical_bar_chart, render_horizontal_bar_chart, render_line_chart, render_area_chart, render_pie_chart, render_doughnut_chart} from '../D3Charts.js'

    export default {
        name : "D3Tes",
        computed : {
            ...mapState(["x_property", "y_property", "dataArray", "chartToUse", "currentPropertiesForChart", "makeTheXElementsUnique"]),
        },
        data () {
            return {
                target_data             : [],
                colors                  : '',
                isTheChartPieOrDoughnut : false,
                isRadiusNeeded          : false,
                isAreaChart             : false,
            }
        },
        methods : {

            ...mapMutations(["toggleToggler", "makeUniqueElements"]),
 
            populateTargetData () {
                this.dataArray.forEach(d => {
                    this.target_data.push({
                        x : d[this.x_property],
                        y : d[this.y_property],
                    })
                })
                let mp = new Map()
                this.target_data.forEach(d => {
                    mp.set(d.x, 0)
                })
                this.target_data.forEach(d => {
                    let value = mp.get(d.x)
                    mp.set(d.x, (value + d.y))
                })
                this.target_data = []
                mp.forEach((value, key) => {
                    this.target_data.push({
                        x :  key,
                        y : value
                    })
                })
            }
        },
        mounted () {

            if (this.chartToUse === 'Pie Chart' || this.chartToUse === 'Doughnut Chart') {
                this.isTheChartPieOrDoughnut = true
                this.isRadiusNeeded = false
                this.isAreaChart = false
            } else {
                this.isTheChartPieOrDoughnut = false
                this.isAreaChart = false
                this.isRadiusNeeded = false
                if (this.chartToUse === 'Line Chart') {
                    this.isRadiusNeeded = true 
                } else if (this.chartToUse === 'Area Chart') {
                     this.isAreaChart = true
                }
            }
            this.populateTargetData()
            if (this.chartToUse === 'Horizontal Bar Chart') {
                render_horizontal_bar_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    0.1, 
                    this.currentPropertiesForChart.setTitle, 
                    this.currentPropertiesForChart.colorForChart,
                    this.currentPropertiesForChart
                )
            } else if (this.chartToUse === 'Vertical Bar Chart') {
                render_vertical_bar_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    0.1, 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart.colorForChart,
                    this.currentPropertiesForChart
                )
            } else if (this.chartToUse === 'Line Chart') {
                render_line_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    2.5, 
                    this.currentPropertiesForChart.radiusOfPoint, 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart.colorForChart,
                    this.currentPropertiesForChart
                )
            } else if (this.chartToUse === 'Area Chart') {
                render_area_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart.colorForChart,
                    this.currentPropertiesForChart.opacity,
                    this.currentPropertiesForChart
                )
            } else if (this.chartToUse === 'Pie Chart') {
                render_pie_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.radiusOfPieOrDoughnut,
                    this.target_data, 
                    120, 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart
                )
            } else if (this.chartToUse === 'Doughnut Chart') {
                render_doughnut_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.radiusOfPieOrDoughnut,
                    this.target_data, 
                    120, 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart
                )
            }

        }
    }
</script>

<style scoped>
    .right-panel {
        width: 20%;
        float: right;
        margin: 10px;
        text-align: left;
    }
</style>

    