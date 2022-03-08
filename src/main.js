import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'

const dataArray = [
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 200003    
    },
    {
        date: Date(30/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 2220000
    },
    {
        date: Date(31/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 240000
    },
    {
        date: Date(1/1/2022),
        month : "December",
        district : "Dhaka",
        sale     : 230000
    },
    {
        date: Date(2/1/2022),
        month : "December",
        district : "Dhaka",
        sale     : 12000
    },
    {
        date: Date(3/1/2022),
        month : "December",
        district : "Dhaka",
        sale     : 2000
    }
]

// https://i.ibb.co/cxGCwnY/area-chart.png
// https://i.ibb.co/JFtHQYs/doughnut-chart.png
// 
// 
// https://i.ibb.co/WHyyMsP/logo.png
// https://i.ibb.co/y4hQ5xD/pie-chart.png
// 

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

    },
    actions : {
        // can be async at the same time call mutations
        // async addRandomNumberToCounter (context) {
        //     const data = await axios.get("https://www.random.org/integers/?num=1&min=-10000&max=10000&col=1&base=10&format=plain&rnd=new")
        //     context.commit("addToCounter", data.data)
        //     // the main value is in data.data
        // }
    },
    getters : {
        // activeIndexes : (state) => (payload) => {
        //     let indexes = []
        //     state.history.forEach((number , index) => {
        //         if (number === payload) {
        //             indexes.push(index)
        //         }
        //     });
        //     return indexes
        // }
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')
