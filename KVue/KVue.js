/**
 * 第一步
 * 对象响应化:遍历每个key，定义getter、setter
 * @param {*} obj
 */
function observe(obj) {
  if(typeof(obj) !== 'object' || obj === null) {
    return
  }

  // 创建一个Observer实例
  new Observer(obj)
}

  // 设置拦截器getter、setter
function defineReactive(obj, key, val) {
    // 如果val为Object,递归调用observe
    observe(val);
    // 局部变量
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get: () => {
        // 依赖收集 Dep.target = 当前key的watcher实例
        Dep.target && dep.addDep(Dep.target)
        // getter拦截器
        // console.log(`get: ${key}: ${val}`);
        return val;
      },
      set: (newVal) => {

        // 改变数据，处罚watcher
        dep.notify();
        // setter拦截器
        if (newVal != val) {
          // console.log(`set: ${key}: ${newVal}`)
          // newVal数据为Object,需要调用observe()变成响应式数据
          observe(newVal);
          // val不仅仅是一个行参，还是一个局部变量，在这里可以形成闭包
          val = newVal;
        }
      }
    })
  }

class Observer {
  constructor(value) {
    this.value = value;
    // 数据类型：Object，数据响应式
    this.walk(value);
  }
  walk(obj) {
    // 将对象中的数据都变成响应式数据
    Object.keys(obj).forEach(item => {
      defineReactive(obj, item, obj[item]);
    });
  }

}
// 数据代理， 将this.$data.xx = this.xx
function proxy(vm, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(vm, key, {
      get: () => {
        return data[key]
      },
      set: (v) => {
        data[key] = v
      }
    })
  })
}

/**
 * 第二步： 编译模版
 */
class Compile{
  constructor(vm, el) {
    this.$vm = vm
    // el为根实例配置的{el: '#app'}
    this.$el = document.querySelector(el);
    if(this.$el) {
      this.compile(this.$el);
    }
  }
  compile(el) {
    // 获取<div id="app"></div> 所有孩子节点
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if(this.isElement(node)) {
        this.compileElement(node);
      } else if(this.isInterpolation(node)) {
        this.compileText(node)
      }
      // 递归元素的孩子节点
      if(node.childNodes) {
        this.compile(node)
      }
    })
  }
  compileElement(node) {
    // v-text="counter" v-html="html"
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const {name, value} = attr;
      if(this.isDriective(name)) {
        let dir = name.substring(2)
        // 调用指令的实操函数
        this[dir] && this[dir](node, value)
      }
      // 处理@开头的事件
      if(this.isEvent(name)) {
        this.eventHandler(node, name.substring(1), value)
      }
    });
    
  }
  // 更新，添加观察者
  update(node, key, dir) {
    // 通过dir: 'text', 'html', 找到响应的实操函数
    let fn = this[dir + 'Updater'];
    fn && fn(node, this.$vm[key])

    // 每一个编译对象对应一个观察者 1 : 1
    new Watcher(this.$vm, key, function(val) {
      fn && fn(node, val)
    })
  }
  // text实操函数
  textUpdater(node, exp) {
    node.textContent = exp
  }
  // v-text, 
  text(node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text');
  }
  // html实操函数
  htmlUpdater(node, exp) {
    node.innerHTML = exp
  }
  // v-html实操函数
  html(node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html');
  }
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, 'text');
  }
  isElement(node) {
    // nodeType == 1 一个元素节点
    return node.nodeType == 1
  }
  isInterpolation(node) {
    // nodeType == 3 为Element和Attr中实际的文字
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  // 是否为指令
  isDriective(name) {
    return name.indexOf('v-') == 0;
  }
  // 判断是否@开头
  isEvent(name) {
    return name.indexOf('@') == 0;
  }
  /**
   * @param {*} node 元素
   * @param {*} event click
   * @param {*} exp onClink方法名
   * @memberof Compile
   */
  eventHandler(node, event, exp) {
    node.addEventListener(event, this.$vm.$options.methods[exp].bind(this.$vm))
  }
  /**
   *  v-model的语法糖 :value @input
   * @param {*} node
   * @param {*} value
   * @memberof Compile
   */
  model(node, value) {
    this.update(node, value, 'model');
    // 监听input事件
    node.addEventListener('input', (e) => {
      this.$vm[value] = e.target.value
    })
  }
  /**
   *  更新元素的value值
   * @param {*} node
   * @param {*} exp
   * @memberof Compile
   */
  modelUpdater(node, exp) {
    node.value = exp
  }
}

let watchers = [];
/**
 * 第三步: 添加监听
 *
 * @class Watcher
 */
class Watcher {
  constructor(vm, key, updateFn) {
    this.$vm = vm
    this.key = key
    this.updateFn = updateFn

    // watchers.push(this)
    // 给Dep加一个标示
    Dep.target = this
    // 触发get方法，在get里面做依赖收集
    this.$vm[this.key]
    // 标示置空
    Dep.target = null
  }

  update() {
    this.updateFn && this.updateFn.call(this.$vm, this.$vm[this.key])
  }
}

/**
 *  收集依赖， dep为依赖的大管家
 *  Dep：watcher是一对多的关系
 * @class Dep
 */
class Dep {
  constructor() {
    this.watchers = []
  }
  addDep(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(w => w.update())
  }
}

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 1. 数据响应化处理
    observe(this.$data);
    // 1.1 数据代理 this.$data.XX = this.XX
    proxy(this, this.$data);
    // 2编译
    new Compile(this, options.el)
  }
}

