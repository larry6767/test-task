<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { INTERVAL } from './constants'

export default Vue.extend({
  name: 'App',
  sockets: {
    connect() {
      const getData = () => {
        this.$socket.client.emit('getCurrentData').emit('getNewRate')
      }

      getData()
      setInterval(getData, INTERVAL)
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
