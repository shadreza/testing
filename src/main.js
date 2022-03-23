import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import axios from 'axios'
const charts = [
    {
        name : "Horizontal Bar Chart",
        image : "https://i.ibb.co/xjcMH9S/horizontal-bar-chart.png",
    },
    {
        name : "Vertical Bar Chart",
        image : "https://i.ibb.co/m0nhkqQ/vertical-bar-chart.png",
    },
    {
        name : "Line Chart",
        image : "https://i.ibb.co/rQfL4cf/line-chart.png",
    },
    {
        name : "Area Chart",
        image : "https://i.ibb.co/cxGCwnY/area_chart.png",
    },
    {
        name : "Pie Chart",
        image : "https://i.ibb.co/y4hQ5xD/pie-chart.png",
    },
    {
        name : "Doughnut Chart",
        image : "https://i.ibb.co/JFtHQYs/doughnut-chart.png",
    },
]

const mainDataArray = [{}]
const allProperties = Object.keys(mainDataArray[0])

const defaultPropertiesForChart = {
    showXLabel              : true,
    showYLabel              : true,
    showXLegend             : true,
    showYLegend             : true,
    showValuesOnChart       : true,
    widthForChart           : 900,
    heightForChart          : 450,
    colorForChart           : '#AD5858',
    opacity                 : 0.5,
    showTitle               : true,
    setTitle                : '',
    radiusOfPoint           : 4,
    radiusOfPieOrDoughnut   : 900,

}


const currentPropertiesForChart = defaultPropertiesForChart

const store = createStore({
    state () {
        return {
            chosenTable                 : null,
            isTableChosen               : false,
            dataArray                   : mainDataArray,
            properties                  : allProperties,
            x_property                  : null,
            y_property                  : null,
            charts                      : charts,
            chartToUse                  : null,
            toggler                     : true,
            defaultPropertiesForChart   : defaultPropertiesForChart,
            currentPropertiesForChart   : currentPropertiesForChart,
            makeTheXElementsUnique      : false,
            baseUrl                     : 'https://d3js-charts.herokuapp.com/api/'
        }
    },
    mutations : {

        changeTable (state, payLoad) {
            state.chosenTable = payLoad
            if (state.chosenTable != null) {
                state.isTableChosen = true
                axios
                    .get(state.baseUrl+'tables/'+state.chosenTable)
                    .then(response => {
                        const dataSet = response.data
                        state.dataArray = dataSet
                        state.properties = Object.keys(state.dataArray[0])
                    })
                    .catch(error => {
                        state.dataArray = [{}]
                        state.properties = Object.keys(state.dataArray[0])
                        alert("No Such Model")
                        console.log(error);
                        this.errored = true
                    })
                    .finally(() => {
                        this.loading = false
                        state.x_property = null
                        state.y_property = null
                        state.chartToUse = null
                    })
            } else {
                state.isTableChosen = false
            }
            state.toggler = !state.toggler
        },
        changeXProperty (state, payLoad) {
            state.x_property = payLoad
            state.toggler =!state.toggler
        },
        changeYProperty (state, payLoad) {
            state.y_property = payLoad
            state.toggler =!state.toggler
        },
        selectChart(state, payLoad) {
            state.chartToUse = payLoad
            state.toggler =!state.toggler
        },
        toggleToggler(state) {
            state.toggler =!state.toggler
        },
        modifyDefaultPropertiesForChart(state, payLoad) {
            state.defaultPropertiesForChart = payLoad
            state.toggler =!state.toggler
        },
        modifyMainDataArray(state, payLoad) {
            state.dataArray = payLoad
            state.properties = Object.keys(state.dataArray[0])
            state.toggler =!state.toggler
        }
    },
})

const app = createApp(App)
app.use(store)
app.mount('#app')