<template>
  <tr>
    <td colspan="3">
      <button v-if="gameEnded" @click="gradeGame">Grade Game</button>
      <span class="grade" v-if="gameGraded">{{ grade }}%</span>
    </td>
    <timer colspan="3"></timer>
    <td colspan="5">
      <button v-if="gameGraded || gameEnded" @click="newGame">New Game</button>
      <div v-else>
        <button v-if="timerRunning" @click="pauseGame">
          Pause Game
        </button>
        <button v-else @click="startGame">
          {{ timerPaused ? 'Resume' : 'Start'}} Game
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapState } from 'vuex'
import Timer from '@/components/Timer'

export default {
  name: 'GameFooter',
  components: {
    Timer
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      timeRemaining: state => state.timeRemaining,
      timerRunning: state => state.timerStatus === 'running',
      timerPaused: state => state.timerStatus === 'paused',
      gameEnded: state => state.gameStatus === 'ended',
      gameGraded: state => state.gameStatus === 'graded',
      grade: state => state.grade
    })
  },
  methods: {
    startGame () {
      this.$store.dispatch('runTimer')
    },
    pauseGame () {
      this.$store.dispatch('pauseTimer')
    },
    gradeGame () {
      this.$emit('gradeGame')
    },
    newGame () {
      this.$store.dispatch('initializeGame')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
td {
  padding: 8px;
  text-align: center;
  border: 1px solid #bdbdbd;
}
</style>
