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
    import { mapMutations } from 'vuex'

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
        methods : {
            ...mapMutations(["changeTable"]),
        },
        mounted() {
            axios
                .get('https://0580-103-109-237-157.ngrok.io/api/tables/')
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