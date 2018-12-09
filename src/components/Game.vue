<template>
  <table>
    <thead>
      <tr>
        <th class="type">x</th>
        <number-display
          v-for="num in topRow"
          :key="num"
          :num="num"
        ></number-display>
      </tr>
    </thead>
    <tbody>
      <tr v-for="num in sideRow" :key="num">
        <number-display :num="num"></number-display>
        <answer
          v-for="i in 10"
          :key="i"
          :num1="topRow[i-1]"
          :num2="num"
        ></answer>
      </tr>
      <game-footer v-on:gradeGame="gradeGame"></game-footer>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex'
import Answer from '@/components/Answer'
import GameFooter from '@/components/GameFooter'
import NumberDisplay from '@/components/NumberDisplay'

export default {
  name: 'Game',
  components: {
    NumberDisplay,
    Answer,
    GameFooter
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      topRow: state => state.topRowNums,
      sideRow: state => state.sideRowNums
    })
  },
  mounted () {
    this.$store.dispatch('initializeGame')
  },
  methods: {
    gradeGame () {
      let correctAnswers = this.$el.querySelectorAll('textarea[correct="true"]').length
      let grade = correctAnswers / (this.topRow.length * this.sideRow.length)
      this.$store.dispatch('gradeGame', grade)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table, th, td {
  border: 1px solid #bdbdbd;
}
table {
  margin: 0 auto;
}
td, th {
  padding: 8px;
  text-align: center;
}
th {
  background-color: #e2e2e2;
  width: 32px;
  height: 25px;
}
.type {
  background-color: #b8dcb4;
}
</style>
