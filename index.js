var HttpHash = require('http-hash')
var m = require('mithril')

function MithrilRouter () {
  this._router = null
}

MithrilRouter.prototype.router = function router (rootElm, defaultRoute, routes) {
  this._router = HttpHash()

  for (var url in routes) {
    this._router.set(url, routes[url])
  }

  this.dispatch = function () {
    var resolvedRoute = this._router.get(window.location.pathname)

    if (resolvedRoute.handler === null) {
      this.replace(defaultRoute)
      return
    }

    m.mount(rootElm, resolvedRoute.handler)
  }

  this.dispatch()
  window.addEventListener('popstate', this.dispatch.bind(this), false)
}

MithrilRouter.prototype.dispatch = function noop () {}

// Stack Operations
MithrilRouter.prototype.peek = function peek () {
  return {
    url: window.url,
    state: window.state
  }
}

MithrilRouter.prototype.pop = function pop () {
  window.history.back()
  this.dispatch()

  return {
    url: window.url,
    state: window.state,
    route: this._router.get(window.url)
  }
}

MithrilRouter.prototype.push = function push (url, state) {
  window.history.pushState(state, null, url)
  this.dispatch()
}

MithrilRouter.prototype.replace = function replace (url, state) {
  window.history.replaceState(state, null, url)
  this.dispatch()
}

// Routing Helpers
MithrilRouter.prototype.anchor = function anchor (state, op) {
  var self = this
  op = op || self.push

  return function config (elm, isInitialized, context, vdom) {
    if (!isInitialized) {
      elm.removeEventListener('click', clickHandler, false)
      elm.addEventListener('click', clickHandler, false)
    }

    function clickHandler (e) {
      e.preventDefault()

      op.call(self, vdom.attrs.href, state)
    }
  }
}

MithrilRouter.prototype.params = function params () {
  return this._router.get(window.location.pathname).params
}

MithrilRouter.prototype.state = function state () {
  return window.history.state
}

MithrilRouter.prototype.splat = function splat () {
  return this._router.get(window.location.pathname).splat
}

module.exports = new MithrilRouter()
module.exports.MithrilRouter = MithrilRouter
