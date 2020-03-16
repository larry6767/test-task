import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  computed: mapGetters(['names', 'rate']),
  methods: {
    ...mapActions(['getNames']),
    getGroupName(groupId: number) {
      return this.names[groupId].G
    },
    getProductName(groupId: number, productId: number) {
      return this.names[groupId].B[productId].N
    },
    getLocalPrice(price: number) {
      return (price * this.rate).toFixed(2)
    },
  },
  mounted() {
    this.getNames()
  },
})
