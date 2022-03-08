<template>
    <div class="selectionPanel">
        <div class="x-selection" v-if="isItXAxis">
            <label for="tagName">property for <b>{{tagName}}</b> axis:  </label>
            <select name="tagName" id="tagName" v-model="xValue" @change="changeXProperty(xValue)">
                <option v-for="option in properties" :key="option" v-bind:value="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="y-selection" v-if="!isItXAxis">
            <label for="tagName">property for <b>{{tagName}}</b> axis:  </label>
            <select name="tagName" id="tagName" v-model="yValue" @change="changeYProperty(yValue)">
                <option v-for="option in properties" :key="option" v-bind:value="option">
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
            tagName : String,
        },
        data () {
            return {
                xValue : null,
                yValue : null,
                isItXAxis : this.tagName === "X" ? true : false
            }
        },
        computed : {
            ...mapState(["dataArray", "properties", "x_property", "y_property"])
        },
        methods : {
            ...mapMutations(["changeXProperty", "changeYProperty"]),
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
    }
    .y-selection {
        float: right;
    }
    .selectionPanel {
        width: auto;
        margin: 2rem;
    }
</style>