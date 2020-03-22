<template>
  <div id="app">
    <emitBus1></emitBus1>
    <emitBus2></emitBus2>
    <onBus></onBus>
  </div>
</template>

<script>
import emitBus1 from '@/components/eventBus/emitBus1.vue';
import emitBus2 from '@/components/eventBus/emitBus2.vue';
import onBus from '@/components/eventBus/onBus.vue'

export default {
  name: 'app',
  components: {
    emitBus1,
    emitBus2,
    onBus
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
