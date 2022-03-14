import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'

const dataArray = [
    {
        date: "22-1-3020",
        month : "January",
        district : "Dhaka",
        sale     : 50    
    },
    {
        date: "22-2-3220",
        month : "February",
        district : "Bogura",
        sale     : 10
    },
    {
        date: "22-3-1020",
        month : "March",
        district : "Jessore",
        sale     : 100
    },
    {
        date: "22-4-4020",
        month : "April",
        district : "Khulna",
        sale     : 33
    },
    {
        date: "22-5-3220",
        month : "May",
        district : "Cumilla",
        sale     : 20
    },
    {
        date: "22-6-3000",
        month : "June",
        district : "Chittagong",
        sale     : 80
    },
    {
        date: "12-10-3120",
        month : "October",
        district : "Lahore",
        sale     : 10
    },
    {
        date: "1-11-3110",
        month : "November",
        district : "Foridpur",
        sale     : 80
    },
    {
        date: "29-9-2017",
        month : "September",
        district : "Darjeeling",
        sale     : 120
    },
]

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

const properties = Object.keys(dataArray[0])

const defaultPropertiesForChart = {
    showXLabel          : true,
    showYLabel          : true,
    showXLegend         : true,
    showYLegend         : true,
    showValuesOnChart   : true,
    maxWidthForChart    : 900,
    maxHeightForChart   : 450,
    colorForBars        : 'black',
    showTitle           : true
}

const currentPropertiesForChart = defaultPropertiesForChart

const store = createStore({
    state () {
        return {
            dataArray                   : dataArray,
            properties                  : properties,
            x_property                  : null,
            y_property                  : null,
            charts                      : charts,
            chartToUse                  : null,
            toggler                     : true,
            defaultPropertiesForChart   : defaultPropertiesForChart,
            currentPropertiesForChart   : currentPropertiesForChart
        }
    },
    mutations : {

        changeXProperty (state, payLoad) {
            state.x_property = payLoad
            state.toggler = ! state.toggler
        },
        changeYProperty (state, payLoad) {
            state.y_property = payLoad
            state.toggler = ! state.toggler
        },
        selectChart(state, payLoad) {
            state.chartToUse = payLoad
            state.toggler = ! state.toggler
        },
        modifyCurrentPropertiesForChart(state, payLoad) {
            state.currentPropertiesForChart = payLoad
            state.toggler = ! state.toggler
        },
        modifyDefaultPropertiesForChart(state, payLoad) {
            state.defaultPropertiesForChart = payLoad
            state.currentPropertiesForChart = payLoad
            state.toggler = ! state.toggler
        },
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')
