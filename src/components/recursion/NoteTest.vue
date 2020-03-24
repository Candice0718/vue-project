<template>
  <div>
    <Note :data="folder"></Note>
  </div>
</template>

<script>
  import Note from './Note.vue'
  export default {
    components: {
      Note,
    },
    data() {
      return {
        folder: {
          name: 'vue-project',
          children: [
            {
              name: 'src',
              children: [
                {
                  name: 'views'
                }
              ]
            },
            {
              name: 'public',
              children: [
                {
                  name: 'index.html'
                }
              ]
            }

          ]
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>