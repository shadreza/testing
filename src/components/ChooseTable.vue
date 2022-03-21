<template>
    <div>
        <br>
        <h3>Choose A Table</h3>
        <div class="selecting-a-table">
            <select name="tagName" id="choose-a-table" v-model="tableChosen" @change="changeTable(tableChosen)">
                <option v-for="option in allTables" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <p v-if="tableChosen"> <strong> {{tableChosen}} </strong> table has been selected</p>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'
    import { mapState, mapMutations } from 'vuex'

    export default {
        name: 'ChooseTable',
        data() {
            return {
                tableChosen : null,
                allTables   : [],
                errored     : false,
                loading     : true,
            }
        },
        computed : {
            ...mapState(["backendURL"])
        },
        methods : {
            ...mapMutations(["changeTable"]),
        },
        mounted() {
            axios
                .get(this.backendURL)
                .then(response => {
                    const data = response.data
                    this.allTables = data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
</script>

<style lang="sass" scoped>

</style>