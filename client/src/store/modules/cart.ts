import { Module } from 'vuex'
import { RootState, CartState, PreparedProduct, CartProduct } from '../../types'

export const cart: Module<CartState, RootState> = {
  namespaced: true,
  state: {
    goods: [],
  },
  getters: {
    goods(state) {
      return state.goods
    },
  },
  mutations: {
    addToCart(state, product: PreparedProduct) {
      let productFound = false

      state.goods.map((x: CartProduct) => {
        if (x.id === product.id) {
          productFound = true
          if (x.quantity < product.inStock) {
            x.quantity++ // deliberately mutate
          }
        }
      })

      if (!productFound) {
        state.goods.push({
          ...product,
          quantity: 1,
        })
      }
    },
    updateQuantity(state, e) {
      const id = Number(e.target.dataset.id)
      const quantity = Number(e.target.value)
      state.goods.map((x: CartProduct) => {
        // deliberately mutate below
        if (x.id === id) {
          if (quantity <= 0) {
            x.quantity = 0 // *
            x.quantity = 1
          } else if (quantity < x.inStock) {
            x.quantity = quantity
          } else {
            x.quantity = 0 // *
            x.quantity = x.inStock
          }
        }
        // (*) I'm not sure about that. Tell me a solution later, please
      })
    },
    removeFromCart(state, id: number) {
      state.goods = state.goods.filter(
        (product: PreparedProduct) => product.id !== id
      )
    },
  },
  actions: {},
}
