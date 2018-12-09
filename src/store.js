import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TopNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const SideNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const shuffle = (array) => {
  let currentIndex = array.length
  let temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export default new Vuex.Store({
  state: {
    topRowNums: [],
    sideRowNums: [],
    timeRemaining: 0,
    timer: null,
    timerStatus: 'stopped',
    gameStatus: 'ended',
    grade: 0
  },
  mutations: {
    setInitialTimeRemaining (state) {
      // minutes = mins * (60 * 1000)
      let fiveMinutes = 5 * (60 * 1000)
      state.timeRemaining = fiveMinutes
    },
    setTopRowNums (state, nums) {
      state.topRowNums = nums
    },
    setSideRowNums (state, nums) {
      state.sideRowNums = nums
    },
    setTimerStatus (state, status) {
      state.timerStatus = status
    },
    setGameStatus (state, status) {
      state.gameStatus = status
    },
    setGrade (state, grade) {
      state.grade = grade
    },
    reduceTimeRemaining (state) {
      let timeLeft = state.timeRemaining - 1000
      state.timeRemaining = timeLeft
    }
  },
  actions: {
    initializeGame ({ commit }) {
      commit('setInitialTimeRemaining')
      let numsForTop = shuffle(TopNumbers)
      numsForTop.pop()
      commit('setTopRowNums', numsForTop)
      let numsForSide = shuffle(SideNumbers)
      numsForSide.pop()
      commit('setSideRowNums', numsForSide)
      commit('setGameStatus', 'ready')
      commit('setGrade', 0)
    },
    pauseTimer ({ commit }) {
      commit('setTimerStatus', 'paused')
      commit('setGameStatus', 'ready')
    },
    runTimer ({ commit }) {
      commit('setTimerStatus', 'running')
      commit('setGameStatus', 'playing')
    },
    endTimer ({ commit }) {
      commit('setTimerStatus', 'stopped')
      commit('setGameStatus', 'ended')
    },
    reduceTimeRemaining ({ commit }) {
      commit('reduceTimeRemaining')
    },
    gradeGame ({ commit }, grade) {
      let gradePercent = Math.floor((grade * 100))
      commit('setGrade', gradePercent)
      commit('setGameStatus', 'graded')
    }
  }
})
