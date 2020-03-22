<template>
  <div id="app">
    <!-- emitBus -->
    <emitBus1 ref="emitBus"></emitBus1>
    <emitBus2></emitBus2>
    <onBus></onBus>
    <!-- $parent/$root-->
    <brother1></brother1>
    <brother2></brother2>
    <!-- $attrs/$listeners -->
    <hello-world msg="sayHi" @click="sayHi"></hello-world>
    {{msg}}
    <!-- $provide/$inject -->
    <inject></inject>
    <!-- slot -->
    <slot-template>
      <template v-slot:default>default</template>
      <template v-slot:content>slot content</template>
      <!-- 自2.6.0 slot-scope已经废弃了
        以前的用法 <template slot="title" slot-scope="row"></template>
        2.6.0+的用法如下
        下面的写法也可以用解构的方式等到子组件传回来的值
        <template v-slot:title={title}> {{title}}</template>
       -->
      <template v-slot:title="row" >{{row.title}}</template>
    </slot-template>
  </div>
</template>

<script>
import emitBus1 from '@/components/eventBus/emitBus1.vue';
import emitBus2 from '@/components/eventBus/emitBus2.vue';
import onBus from '@/components/eventBus/onBus.vue'
import brother1 from '@/components/parent/brother1.vue';
import brother2 from '@/components/parent/brother2.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Inject from '@/components/provide/inject.vue';
import slotTemplate from '@/components/slots/slotTemplate.vue';

export default {
  name: 'app',
  components: {
    emitBus1,
    emitBus2,
    onBus,
    brother1,
    brother2,
    HelloWorld,
    Inject,
    slotTemplate
  },
  provide() {
    // 隔代传参：用法类似于data
    // 传递响应式的对象就是响应式的
    return {
      foo: 'app foo',
      app: this
    }
  },
  data() {
    return {
      msg: ''
    }
  },
  mounted () {
    // this.$children为自定义组件
    // this.$children顺序不一定就是注册的顺序，可能会存在异步组件的情况
    // 父组件可以通过$children修改子组件的data,也可以调用子组件的方法
    console.log(this.$children);
    this.$children[0].name = 'hahaha,baba改了你的name';
    this.$children[0].callMe();

    this.$refs.emitBus.name = 'refs改了name'
  },
  methods: {
    sayHi(msg) {
      console.log(`msg:${msg}`)
      this.msg = msg
    }
  },
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
