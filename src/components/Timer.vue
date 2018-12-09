<template>
  <td>
    Time: {{ minutesLeft }}:<span v-if="secondsLeft < 10">0</span>{{ secondsLeft }}
  </td>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Timer',
  data () {
    return {
      timer: null
    }
  },
  computed: {
    ...mapState({
      timeRemaining: state => state.timeRemaining,
      timerRunning: state => state.timerStatus === 'running'
    }),
    minutesLeft () {
      return Math.floor(this.timeRemaining / (60 * 1000))
    },
    secondsLeft () {
      return Math.floor((this.timeRemaining / 1000) - (this.minutesLeft * 60))
    }
  },
  methods: {
    timeDown () {
      if (this.timerRunning) {
        if (this.timeRemaining > 0) {
          this.$store.dispatch('reduceTimeRemaining')
        } else {
          this.$store.dispatch('endTimer')
        }
      }
    }
  },
  mounted () {
    this.timer = setInterval(this.timeDown, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
