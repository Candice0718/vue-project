<template>
  <div id="note">
    <h3 :style="{'margin-left': level + 'em'}">
      {{data.name}}
    </h3>
    <!-- 递归组件必须要有终止条件 -->
    <Note v-for="item in data.children" 
      :key="item.name" 
      :level="level + 1"
      :data="item"
      > 
    </Note>
  </div>
</template>

<script>
  import Note from './Note.vue';
  export default {
    name: 'Note', // 递归组件必须要有name属性
    components: {
      Note,
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        default: 0
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>