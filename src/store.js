// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    actions: {
      fetchCounter ({ commit }) {
        commit('setCounter');
      }
    },
    mutations: {
      setCounter (state) {
        console.log('hah')
        state.counter++;
      }
    }
  })
}