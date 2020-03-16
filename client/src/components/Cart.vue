<template>
  <div class="cart">
    <table class="cart-table">
      <thead>
        <tr>
          <td>Наименование товара и описание</td>
          <td>Количество</td>
          <td colspan="2">Цена</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in goods" :key="`cart-${product.id}`">
          <td>
            {{ getProductName(product.groupId, product.id) }}
          </td>
          <td>
            <input
              class="quantity"
              type="number"
              :value="product.quantity"
              @input="updateQuantity"
              :data-id="product.id"
              :max="product.inStock"
              :min="1"
            />
            шт.
            <div class="low-quantity" v-if="product.inStock < 50">
              Количество ограничено
            </div>
          </td>
          <td>
            <span class="cost">{{ getLocalPrice(product.price) }} ₽ </span>
            <span class="cost-quantity">/ шт.</span>
          </td>
          <td>
            <span class="remove" @click.prevent="removeFromCart(product.id)"
              >Удалить</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="total-cost-block">
              <span>Общая стоимость:</span>
              <span class="total-cost"
                >{{ getLocalPrice(getTotalCost()) }} ₽</span
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
import GettersMixin from '../mixins'
import { CartProduct } from '../types'

const { mapGetters, mapMutations } = createNamespacedHelpers('cart')

export default Vue.extend({
  name: 'Cart',
  mixins: [GettersMixin],
  computed: mapGetters(['goods']),
  methods: {
    ...mapMutations(['removeFromCart', 'updateQuantity']),
    getTotalCost() {
      return this.goods.reduce((acc: number, x: CartProduct) => {
        return (acc += x.price * x.quantity)
      }, 0)
    },
  },
})
</script>

<style>
.cart {
  margin: 20px 3px;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #2c3e50;
}

td {
  text-align: start;
  width: calc(50% / 3);
  padding: 12px;
}

thead td {
  border-bottom: 1px solid #2c3e50;
}

tbody td {
  padding: 20px 12px;
  vertical-align: top;
  border-top: 1px solid #2c3e50;
}

tbody td:last-child {
  text-align: end;
}

tbody tr:first-child td,
tbody tr:last-child td {
  border-top: none;
}

td:first-child {
  width: 50%;
}

.quantity {
  outline: none;
  margin-bottom: 10px;
  width: 50px;
  height: 30px;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  padding: 0 5px;
  font-size: 16px;
  color: #2c3e50;
}

.low-quantity {
  color: #ff761a;
  padding: 10px 5px;
  border: 1px dotted #ff761a;
  background: #fffaf2;
}

.cost {
  font-weight: bold;
  font-size: 16px;
  color: #000000;
}

.cost-quantity {
  font-weight: bold;
  font-size: 16px;
}

.remove {
  cursor: pointer;
}

.total-cost-block {
  display: flex;
  justify-content: flex-end;
  line-height: 16px;
  padding-right: 10px;
}

.total-cost {
  font-size: 16px;
  color: #ff761a;
  font-weight: bold;
  margin-left: 5px;
}
</style>
