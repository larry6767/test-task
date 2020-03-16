import { PreparedProduct, CartProduct } from '../types'

export default {
  namespaced: true,
  state: {
    goods: [],
  },
  getters: {
    goods(state: any) {
      return state.goods
    },
  },
  mutations: {
    addToCart(state: any, product: PreparedProduct) {
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
    updateQuantity(state: any, e: any) {
      const id = Number(e.target.dataset.id)
      const quantity = Number(e.target.value)
      state.goods.map((x: CartProduct) => {
        if (x.id === id) {
          x.quantity < x.inStock
            ? (x.quantity = quantity)
            : ((x.quantity = 0), (x.quantity = x.inStock)) // deliberately mutate
        }
      })
    },
    removeFromCart(state: any, id: number) {
      state.goods = state.goods.filter(
        (product: PreparedProduct) => product.id !== id
      )
    },
  },
  actions: {},
}
