import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// local libs
import App from './App.vue'
import store from './store'
import { HOST } from './constants'

Vue.config.productionTip = false

const actionPrefix = 'socket'
const mutationPrefix = actionPrefix
const eventToActionTransformer = (x: string) => upperFirst(camelCase(x))
const eventToMutationTransformer = eventToActionTransformer

Vue.use(VueSocketIOExt, io(HOST), {
  store,
  actionPrefix,
  mutationPrefix,
  eventToActionTransformer,
  eventToMutationTransformer,
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
