export default {
  render(h) {
    // 给router-view设置一个标记
    this.$vnode.data.routerView = true;

    let depth = 0;
    let parent = this.$parent;
    // 递归查询当前router-view的深度
    while(parent) {
      if(parent.$vnode && parent.$vnode.data) {
        if(parent.$vnode.data.routerView) {
          depth++
        }
      }
      parent = parent.$parent;
    }

    // children需要从matched[]获取当前的path-component mapping
    const {matched} = this.$router;
    var component = matched[depth] && matched[depth].component;
    return h(component);
    // 不考虑children设计
    // const {current, sourceMap} = this.$router;
    // const component = sourceMap[current] ? sourceMap[current].component : null;
    // return h(component)
  }
}