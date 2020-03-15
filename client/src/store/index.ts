import Vue from 'vue'
import Vuex from 'vuex'
import groupBy from 'lodash/groupBy'
import { Product, PreparedProduct } from './types'

Vue.use(Vuex)

// Mutations and actions will be dispatched or committed automatically
// by plugin vue-socket.io-extended when a socket event arrives.
export default new Vuex.Store({
  state: {
    goods: null,
    rate: null,
  },
  getters: {
    goods(state) {
      return state.goods
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
  },
  actions: {
    socketErrorWhileReceivingData(ctx, data) {
      console.error('-- socketErrorWhileReceivingData --')
    },
  },
})
