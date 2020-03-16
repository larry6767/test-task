import Vue from 'vue'
import Vuex from 'vuex'
import groupBy from 'lodash/groupBy'
// local libs
import cart from './modules/cart'
import { Product, PreparedProduct } from './types'

Vue.use(Vuex)

// Mutations and actions will be dispatched or committed automatically
// by plugin vue-socket.io-extended when a socket event arrives.
export default new Vuex.Store({
  state: {
    names: null,
    goods: null,
    rate: null,
  },
  getters: {
    names(state) {
      return state.names
    },
    goods(state) {
      return state.goods
    },
    goodsByGroup(state) {
      return groupBy(state.goods, (x: PreparedProduct) => x.groupId)
    },
    rate(state) {
      return state.rate
    },
  },
  mutations: {
    socketNewData(state, data) {
      const goods = data.Value.Goods
      // for nice interaction in the template
      state.goods = goods.map((x: Product) => ({
        id: x.T,
        groupId: x.G,
        price: x.C,
        inStock: x.P,
      }))
    },
    socketNewRate(state, { rate }) {
      state.rate = rate
    },
    updateNames(state, names) {
      state.names = names
    },
  },
  actions: {
    socketErrorWhileReceivingData() {
      console.error('-- socketErrorWhileReceivingData --')
    },
    async getNames(ctx) {
      const res = await fetch(`http://localhost:7000/api/names`)
      const names = await res.json()
      ctx.commit('updateNames', names)
    },
  },
  modules: {
    cart,
  },
})
