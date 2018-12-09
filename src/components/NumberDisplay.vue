<template>
  <th>
    {{ hideNumber ? 'X' : num }}
  </th>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NumberDisplay',
  props: {
    num: Number
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      timerStatus: state => state.timerStatus,
      gameStatus: state => state.gameStatus
    }),
    hideNumber () {
      return this.timerStatus === 'paused' || this.gameStatus === 'ready'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
