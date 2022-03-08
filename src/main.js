import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'

const dataArray = [
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 20000    
    },
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 20000
    },
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 20000
    },
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 20000
    },
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 20000
    },
    {
        date: Date(29/12/2021),
        month : "December",
        district : "Dhaka",
        sale     : 20000
    }
]

const properties = Object.keys(dataArray[0])

const store = createStore({
    state () {
        return {
            dataArray: dataArray,
            properties: properties,
            x_property : null,
            y_property : null,
        }
    },
    mutations : {

        changeXProperty (state, payLoad) {
            state.x_property = payLoad
        },
        changeYProperty (state, payLoad) {
            state.y_property = payLoad
        }

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
