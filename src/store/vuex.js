import {forEachValue, partial} from './utils.js'
/**
 * Store的实现目标：
 * 1. Store插件，实现install方法
 * 2. 生命一个Store类，挂载$store,
 * 3. 创建响应式的state，保存mutations，actions和getter
 * 4. 实现commit根据用户传入的type执行对应mutation
 * 5. 实现dispatch根据用户传入type执行对应action，同时传递上下文
 * 6. 实现getters, 按照getter定义对state做派生
 * 
 *
 * @class Store
 */
let Vue;
class Store{
  constructor(options = {}) {
    // 将this保存到store上，防止this指向改变
    const store = this;
    // 保存用户配置的mutation
    this._mutations = options.mutations;
    // 保存用户配置的actions
    this._actions = options.actions;
    // 保存用户配置的getters
    let _wrappedGetters = options.getters;
    // 保存用户的getter
    let computed = {};
    // 将getters绑定到store实例上
    this.getters = {};

    // 获取用户定义的getters
    forEachValue(_wrappedGetters, (fn, key) => {
      // 将用户配置的getters封装成一个高阶函数
      computed[key] = partial(fn, options.state)
      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key], 
        enumerable: true // for local getters
      })
    })

    // 用Vue实例data做响应式的state
    this._vm = new Vue({
      data: {
        // 用$$就必须this.data.$$state才可以获取值
        $$state: options.state
      },
      computed
    })

    
    // 绑定commit上下文否则action中调用commit可能会存在问题
    // 同时也把action绑了，因为action可以互相调用
    const {commit, action} = store;
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload);
    }
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload);
    }
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.log('please use replaceState to reset state!');
  }


  commit(type, payload) {
    const entry = this._mutations[type];

    if(!entry) {
      console.error(`unknown mutations type: ${type}`);
      return;
    }

    // 指定上下文为Store实例
    // 传递state给mutation
    entry(this.state, payload);
  }

  dispatch(type, payload) {
    const entry = this._actions[type];

    if(!entry) {
      console.error(`unknown action type: ${type}`);
      return;
    }

    // 指定上下文为Store实例
    // 传递store给action
    return entry(this, payload);
  }
}

function install(_vue) {
  Vue = _vue;

  // mixin混入，在根实例挂载$store
  Vue.mixin({
    beforeCreate() {
      // 将根实例的store挂载到$store上
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  })
}

export default {
  Store,
  install
}