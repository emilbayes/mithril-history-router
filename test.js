var r = require('.')
var m = require('mithril')

var Component1 = {
  controller: function (state) {},
  view: function (ctrl) {
    return m('a[href=/2/hello]', {config: r.anchor()}, 'Hello 1')
  }
}

var Component2 = {
  controller: function (state) {
    console.log(r.params())
  },
  view: function (ctrl) {
    return m('h1', 'Hello 2')
  }
}

var root = document.createElement('main')

document.body.appendChild(root)

r.router(root, '/1', {
  '/1': Component1,
  '/2/:hello': Component2
})
