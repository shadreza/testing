import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'

// dataArray = DATA_FROM_DJANGO

const mainDataArray = [
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
        sale     : 30
    },
    {
        date: "22-3-1020",
        month : "March",
        district : "Jessore",
        sale     : 5
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
        sale     : 100
    },
    {
        date: "12-10-3120",
        month : "October",
        district : "Dhaka",
        sale     : 106
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
        sale     : 127
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

const properties = Object.keys(mainDataArray[0])

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
            dataArray                   : mainDataArray,
            properties                  : properties,
            x_property                  : null,
            y_property                  : null,
            charts                      : charts,
            chartToUse                  : null,
            toggler                     : true,
            defaultPropertiesForChart   : defaultPropertiesForChart,
            currentPropertiesForChart   : currentPropertiesForChart,
            makeTheXElementsUnique      : false,
        }
    },
    mutations : {

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
        makeUniqueElements(state) {
            state.makeTheXElementsUnique = !state.makeTheXElementsUnique
            if (state.makeTheXElementsUnique === false) {
                state.dataArray = mainDataArray
            } else {
                let tmpDataArray = mainDataArray
                for(let i = 0; i < tmpDataArray.length; i++) {
                    for(let j = i+1; j < tmpDataArray.length; j++) {
                        if(tmpDataArray[i][state.x_property] === tmpDataArray[j][state.x_property]) {
                            tmpDataArray[i][state.y_property] = tmpDataArray[i][state.y_property] + tmpDataArray[j][state.y_property]
                            tmpDataArray.splice(j, 1)
                        }
                    } 
                }
                state.dataArray = tmpDataArray
            }
            state.toggler =!state.toggler
        }
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')