export default {
  render(h) {
    const {current, sourceMap} = this.$router;
    const component = sourceMap[current] ? sourceMap[current].component : null;
    return h(component)
  }
}