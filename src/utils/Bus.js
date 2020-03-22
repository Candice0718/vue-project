/**
 * 事件总线用法
 * 1.在vue原型上挂载Bus实例
 * vue.prototype.$bus = new Bus();
 * 
 * 2.派发事件
 * this.$bus.$emit(name, args);
 * 
 * 3.监听事件
 * this.$bus.$on(name, fn)
 */
export default class Bus {
  constructor() {
    // 通信事件的集合
    this.callbacks = {}
  }
  /**
   * 事件监听
   * @param {*} name 事件名
   * @param {*} fn 事件响应函数
   */
  $on(name, fn) {
    // 将事件监听已数组的形式存放在事件集合中
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  /**
   * 事件派发
   * @param {*} name 事件名
   * @param {*} args 事件参数
   */
  $emit(name, args) {
    // 先有监听事件的函数才可以派发事件
    if(this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args));
    }
  }
}