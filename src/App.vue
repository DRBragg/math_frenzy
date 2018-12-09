<template>
  <div id="app">
    <h2>Five Minute Multiplying Frenzy</h2>
    <game></game>
  </div>
</template>

<script>
import Game from './components/Game'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
