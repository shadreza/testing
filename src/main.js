import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'

const dataArray = [
    {
        date: "22-1-3020",
        month : "January",
        district : "Dhaka",
        sale     : 20000    
    },
    {
        date: "22-2-3220",
        month : "February",
        district : "Bogura",
        sale     : 22200
    },
    {
        date: "22-3-1020",
        month : "March",
        district : "Jessore",
        sale     : 24000
    },
    {
        date: "22-4-4020",
        month : "April",
        district : "Khulna",
        sale     : 23000
    },
    {
        date: "22-5-3220",
        month : "May",
        district : "Cumilla",
        sale     : 12000
    },
    {
        date: "22-6-3000",
        month : "June",
        district : "Chittagong",
        sale     : 2000
    }
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

const store = createStore({
    state () {
        return {
            dataArray: dataArray,
            properties: properties,
            x_property : null,
            y_property : null,
            charts : charts,
            chartToUse : null,
            toggler : true,
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
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')
