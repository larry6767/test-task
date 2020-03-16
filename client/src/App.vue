<template>
  <div id="app">
    <div class="container" v-if="names && goodsByGroup">
      <ul class="group-list" :style="listStyleObject">
        <li
          class="group-item"
          v-for="(group, groupId) in goodsByGroup"
          :key="groupId"
        >
          <div class="group-header">{{ getGroupName(groupId) }}</div>
          <ul class="product-list">
            <li
              class="product-item"
              v-for="product in group"
              :key="product.id"
              @click.prevent="addToCart(product)"
            >
              <div class="product-name">
                {{ getProductName(groupId, product.id) }} ({{
                  product.inStock
                }})
              </div>
              <div class="product-price" v-bind:class="rateClassObject">
                {{ getLocalPrice(product.price) }} ₽
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Cart />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
// local libs
import { INTERVAL } from './constants'
import Cart from './components/Cart.vue'
import GettersMixin from './mixins'

export default Vue.extend({
  name: 'App',
  mixins: [GettersMixin],
  components: {
    Cart,
  },
  data(): {
    rateHasGrown: null | boolean
    rateAnimation: boolean
  } {
    return {
      rateHasGrown: null,
      rateAnimation: false,
    }
  },
  computed: {
    ...mapGetters(['goodsByGroup', 'goods']),
    listStyleObject: function(): { height: string } {
      // This solution allows the browser to display the list correctly
      // for any number of products.
      // It can be upgraded for even greater accuracy.
      // But this is enough for the test.
      const height =
        this.goodsByGroup && this.goods
          ? `${((Object.keys(this.goodsByGroup).length + this.goods.length) *
              40) /
              2}px`
          : 'auto'

      return {
        height,
      }
    },
    rateClassObject: function(): {
      'rate-up': boolean
      'rate-down': boolean
    } {
      const x = this.rateAnimation
      const y = this.rateHasGrown
      return {
        'rate-up': x && y !== null && y,
        'rate-down': x && y !== null && !y,
      }
    },
  },
  watch: {
    rate: function(next, prev) {
      this.rateHasGrown = prev === null ? null : next > prev

      this.rateAnimation = true
      setTimeout(() => (this.rateAnimation = false), 300)
    },
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
  methods: mapMutations('cart', ['addToCart']),
})
</script>

<style>
* body {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}

.container {
  max-width: 1130px;
}

.group-list {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.group-item {
  flex-shrink: 1;
  width: calc(50% - 6px);
  border: 1px solid #2c3e50;
  border-radius: 4px;
  margin: 3px;
  overflow: hidden;
}

.group-header {
  background: #d2dee2;
  border-bottom: 1px solid #2c3e50;
  font-weight: bold;
  font-size: 16px;
  text-align: start;
  padding: 2px 20px;
}

.product-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.product-item {
  font-size: 14px;
  display: flex;
  border-bottom: 1px solid #2c3e50;
  cursor: pointer;
}

.product-item:hover .product-name {
  background: #ecdfa8;
}

.product-item:hover .product-price {
  background: #e1d5a0;
}

.product-item:last-child {
  border-bottom: none;
}

.product-name {
  display: flex;
  text-align: start;
  align-content: center;
  flex-grow: 1;
  padding: 5px 10px;
  transition: background 0.3s;
}

.product-price {
  font-weight: bold;
  width: 100px;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
  transition: background 0.3s, color 0.3s;
}

.rate-up,
.product-item:hover .rate-up {
  background: #eca8a8;
  color: #ffffff;
}

.rate-down,
.product-item:hover .rate-down {
  background: #a8ecb0;
  color: #ffffff;
}
</style>
