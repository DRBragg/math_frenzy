<template>
  <td :class="classes">
    <span v-if="gameStatus === 'graded'">{{ answer }}</span>
    <textarea v-else v-model="answer" :disabled="gameStatus != 'playing'" :correct="correct"></textarea>
  </td>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Answer',
  props: {
    num1: Number,
    num2: Number
  },
  data () {
    return {
      answer: '',
      correctAnswer: 0
    }
  },
  computed: {
    classes () {
      return {
        answer: true,
        correct: this.gameStatus === 'graded' && this.correct,
        incorrect: this.gameStatus === 'graded' && !this.correct,
        skipped: this.gameStatus === 'graded' && !this.answer
      }
    },
    ...mapState({
      gameStatus: state => state.gameStatus
    }),
    correct () {
      return parseInt(this.answer) === this.correctAnswer
    }
  },
  watch: {
    gameStatus () {
      if (this.gameStatus === 'ready') {
        this.reset()
      }
    }
  },
  methods: {
    reset () {
      this.answer = ''
      this.correctAnswer = this.num1 * this.num2
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.answer {
  padding: 0;
  font-size: 20px;
  & textarea {
    height: 30px;
    width: 40px;
    resize: none;
    font-size: 20px;
    text-align: center;
    border: none;
  }
}
.correct {
  color: green;
  background-color: lightgreen;
}
.incorrect {
  color: red;
  background-color: lightpink;
}
.skipped {
  background-color: #bdbdbd;
}
</style>
