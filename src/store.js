import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apartments: []
  },
  mutations: {
    getApartments (state, payload) {
      state.apartments = payload
    }
  },
  actions: {
    getApartmentsAPI (context, payload) {
      Axios.get('/static/getApartmentsByFilter.json').then(response => {
        context.commit('getApartments', response.data)
      })
    }
  },
  getters: {
    apartments (state) {
      return state.apartments
    }
  }
})
