import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const compareTypes = {
  rooms: function (a, b) {
    var roomList = {
      Однокомнатная: '1',
      Двухкомнатная: '2',
      Трехкомнатная: '3',
      Четырёхкомнатная: '4',
      Студия: 'С'
    }

    var roomValueA = roomList[a.rooms] || ''
    var roomValueB = roomList[b.rooms] || ''
    var roomsA = roomValueA.toString()
    var roomsB = roomValueB.toString()

    return roomsA > roomsB ? 1 : -1
  },
  floor: function (a, b) {
    var floorA = parseInt(a.floor, 10)
    var floorB = parseInt(b.floor, 10)

    return floorA - floorB
  },
  area: function (a, b) {
    var areaA = parseFloat(a.area)
    var areaB = parseFloat(b.area)

    return areaA - areaB
  },
  price: function (a, b) {
    var totalCostA = a.totalCost.replace(/\D/g, '')
    var totalCostB = b.totalCost.replace(/\D/g, '')
    var priceA = parseFloat(totalCostA)
    var priceB = parseFloat(totalCostB)

    return priceA - priceB
  }
}

export default new Vuex.Store({
  state: {
    apartments: [],
    sortByValue: '',
    checkedHousesTypeIds: {
      name: 'houses_type_id[]',
      data: []
    },
    checkedFloors: {
      name: 'floors[]',
      data: []
    },
    checkedRooms: {
      name: 'rooms[]',
      data: []
    },
    checkedAreaRange: [29, 125]
  },
  mutations: {
    SET_APARTMENTS (state, payload) {
      state.apartments = payload
    },
    SORT_BY_VALUE (state, payload) {
      state.sortByValue = payload
    },
    SET_CHECKED_HOUSES_TYPE_IDS (state, payload) {
      state.checkedHousesTypeIds.data = payload
    },
    SET_CHECKED_FLOORS (state, payload) {
      state.checkedFloors.data = payload
    },
    SET_CHECKED_ROOMS (state, payload) {
      state.checkedRooms.data = payload
    },
    SET_CHECKED_AREA_RANGE (state, payload) {
      state.checkedAreaRange = payload
    }
  },
  actions: {
    GetApartmentsAPI ({ commit }, payload) {
      Axios.get(`${process.env.VUE_APP_GET_APARTMENTS_API}?${payload}`).then(
        response => {
          commit('SET_APARTMENTS', response.data)
        }
      )
    }
  },
  getters: {
    sortedApartments (state, getters) {
      const compareMethod = compareTypes[getters.sortByValue]

      if (compareMethod) {
        return state.apartments.slice().sort(compareMethod)
      }

      return state.apartments.slice()
    },
    sortByValue (state) {
      return state.sortByValue
    },
    checkedHousesTypeIds (state) {
      return state.checkedHousesTypeIds
    },
    checkedFloors (state) {
      return state.checkedFloors
    },
    checkedRooms (state) {
      return state.checkedRooms
    },
    checkedAreaRange (state) {
      return state.checkedAreaRange
    }
  }
})
