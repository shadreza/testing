<template>
  <div id="app">
    <HomePage />
    <!-- <D3Tes /> -->
  </div>
</template>

<script>

  import HomePage from "./Views/HomePage"
  // // import D3Tes from "./Views/D3Tes"

export default {
  name: 'App',
  components: {
    HomePage,
    // D3Tes,
  }
}
</script>

<style scoped>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

