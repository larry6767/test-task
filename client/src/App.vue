<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      {{ rateHasGrown }}
    </div>
    <div v-if="names && goodsByGroup">
      <ul>
        <li v-for="(group, groupId) in goodsByGroup" :key="groupId">
          <h2>{{ getGroupName(groupId) }}</h2>
          <ul>
            <li v-for="product in group" :key="product.id">
              <p>
                {{ getProductName(groupId, product.id) }} ({{
                  product.inStock
                }})
                <b>{{ getLocalPrice(product.price, rate) }} рублей</b>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
// local libs
import { INTERVAL } from './constants'

export default Vue.extend({
  name: 'App',
  data(): {
    rateHasGrown: null | boolean
  } {
    return {
      rateHasGrown: null,
    }
  },
  computed: mapGetters(['names', 'goodsByGroup', 'rate']),
  watch: {
    rate: function(next, prev) {
      this.rateHasGrown = prev === null ? null : next > prev
    },
  },
  mounted() {
    this.getNames()
  },
  sockets: {
    connect() {
      const getData = () => {
        this.$socket.client.emit('getCurrentData').emit('getNewRate')
      }

      getData()
      setInterval(getData, INTERVAL)
    },
  },
  methods: {
    ...mapActions(['getNames']),
    getGroupName(groupId: number) {
      return this.names[groupId].G
    },
    getProductName(groupId: number, productId: number) {
      return this.names[groupId].B[productId].N
    },
    getLocalPrice(price: number, rate: number) {
      return (price * rate).toFixed(2)
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
