<template>
    <div class="selectionPanel">
        <div class="x-selection" v-if="isItXAxis">
            <label for="tagName">property for <b> Reference </b> axis:  </label>
            <select name="tagName" id="tagName" v-model="xValue" @change="changeXProperty(xValue)">
                <option v-for="option in properties" :key="option" v-bind:value="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="y-selection" v-if="!isItXAxis">
            <label for="tagName">property for <b> Target </b> axis:  </label>
            <select name="tagName" id="tagName" v-model="yValue" @change="changeYProperty(yValue)">
                <option v-for="option in valueProperty" :key="option" v-bind:value="option">
                    {{ option }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex'

    export default {
        name : "SelectingAxisComponent",
        props : {
            tagName     : String,
        },
        data () {
            return {
                xValue : null,
                yValue : null,
                isItXAxis : this.tagName === "X" ? true : false,
                valueProperty : []
            }
        },
        computed : {
            ...mapState(["dataArray", "properties", "x_property", "y_property"])
        },
        methods : {
            ...mapMutations(["changeXProperty", "changeYProperty"]),
        },
        mounted () {
            this.properties.forEach(p => {
                if(typeof(this.dataArray[0][p])==='number'){
                    this.valueProperty.push(p)
                }
            });
        }
    }
</script>

<style scoped>
    select {
        padding: auto;
        border-radius: 5px;
        margin-left: 10px;
        cursor: pointer;
    }
    .x-selection {
        float: left;
        margin-left: 15%;
    }
    .y-selection {
        margin-right: 15%;
        float: right;
    }
    .selectionPanel {
        width: auto;
        margin: 2rem;
    }
</style>