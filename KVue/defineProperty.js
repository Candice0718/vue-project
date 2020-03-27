const arrayProto = Array.prototype
// 备份
const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function (method) {
  // 缓存数组原型链七君子：push、pop、shift、unshift、splice、sort、reverse
  const original = arrayProto[method]
  // 数组原型响应式
  Object.defineProperty(arrayMethods, method, {
    value: function(...args){
      // 原始操作
      const result = original.apply(this, args)
      return result
    }
  })
})

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * 对象响应化:遍历每个key，定义getter、setter
 * @param {*} obj
 */
function observe(obj) {
  if(typeof(obj) !== 'object' || obj === null) {
    return
  }
  // 将对象中的数据都变成响应式数据
  Object.keys(obj).forEach(item => {
    // 判断obj类型
    if(Array.isArray(obj[item])) {
      for(let i = 0; i < arrayKeys.length; i++) {
        const key = arrayKeys[i];
        defineReactive(obj[item], key, arrayMethods[key]);
      }
      
      // 对数组内部元素执行响应化
      observeArray(obj[item]);
    } else {
      defineReactive(obj, item, obj[item]);
    }
  });
}
// 设置拦截器getter、setter
function defineReactive(obj, key, val) {
  // 如果val为Object,递归调用observe
  observe(val);
  Object.defineProperty(obj, key, {
    get: () => {
      // getter拦截器
      console.log(`get: ${key}: ${val}`);
      return val;
    },
    set: (newVal) => {
      // setter拦截器
      if (newVal != val) {
        console.log(`set: ${key}: ${newVal}`)
        // newVal数据为Object,需要调用observe()变成响应式数据
        observe(newVal);
        // val不仅仅是一个行参，还是一个局部变量，在这里可以形成闭包
        val = newVal;
      }
      
    }
  })
}
/**
 *  对象中的key没有定义过getter、setter
 *  调用$set才可以变成响应式数据
 */
function $set(obj, key, val) {
  defineReactive(obj, key, val);
}

function observeArray(value) {
  for (let i = 0, l = value.length; i < l; i++) {
    observe(value[i])
  }
}
// Object类型数据设置getter、setter
const obj = { foo: 'foo', bar: 'bar', baz: {a: 1}, bab: [0, 1, 2]};
observe(obj)

// obj.foo
// obj.foo = 'foooooo'
// obj.bar
// obj.foo = 'barrrrr'
obj.baz = {a: 10}

obj.baz.a

// dong未设置过getter、setter
// $set(obj, 'dong', 'dong')
// obj.dong
obj.bab.push(3);
obj.bab;

