<template>
  <div>
    {{message}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: []
      }
    },
    mounted () {
        this.$bus.$on('init', (message) => {
          this.message.push(message);
        })
    },
  }
</script>

<style lang="scss" scoped>

</style>