<template>
  <div class="home">
    <p>{{$store.state.counter}}</p>
    <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter: {{$store.state.counter}}</p> 
    <p>double:{{$store.getters.doubleCounter}}</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created () {
    console.log(this.$store)
  },
}
</script>
