<template>
  <div class="hello">
    <!-- $listeners是组件事件的集合
    1. v-on="$listeners"解构组件事件
    2. 给组件事件传参、单个事件@click = $listeners.click
     -->
    <el-button @click="$listeners.click('helloWorld')">{{$attrs.msg}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    // console.log(this.$listeners);
  },
  methods: {
    name() {
      
    }
  },
}
</script>
