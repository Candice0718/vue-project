export default {
  props: {
    to: {
      type: String,
      required: true,
      default: '/'
    },
  },
  render(h) {
    // 显示目标<a href="#/about">about</a>
    return h(
      'a',
      {attrs: { href: `#${this.to}`}},
      [this.$slots.default]
    )
  }
}