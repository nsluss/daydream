function Component (config) {
  this.render = function (props) {
    return config.init(config.template, props)
  }
}

function component (config) {
  return new Component(config)
}
