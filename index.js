var HttpHash = require('http-hash')
var m = require('mithril')

function MithrilHistoryRouter () {
  this._router = null
}

MithrilHistoryRouter.prototype.router = function router (rootElm, defaultRoute, routesHash) {
  this._router = HttpHash()

  for (var url in routesHash) {
    this._router.set(url, routesHash[url])
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

MithrilHistoryRouter.prototype.dispatch = function noop () {}

// Stack Operations
MithrilHistoryRouter.prototype.peek = function peek () {
  return {
    url: window.url,
    state: window.state
  }
}

MithrilHistoryRouter.prototype.pop = function pop () {
  window.history.back()
  this.dispatch()

  return {
    url: window.url,
    state: window.state,
    route: this._router.get(window.url)
  }
}

MithrilHistoryRouter.prototype.push = function push (url, state) {
  window.history.pushState(state, null, url)
  this.dispatch()
}

MithrilHistoryRouter.prototype.replace = function replace (url, state) {
  window.history.replaceState(state, null, url)
  this.dispatch()
}

// Routing Helpers
MithrilHistoryRouter.prototype.anchor = function anchor (state, op) {
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

MithrilHistoryRouter.prototype.params = function params () {
  return this._router.get(window.location.pathname).params
}

MithrilHistoryRouter.prototype.state = function state () {
  return window.history.state
}

MithrilHistoryRouter.prototype.splat = function splat () {
  return this._router.get(window.location.pathname).splat
}

module.exports = new MithrilHistoryRouter()
module.exports.MithrilHistoryRouter = MithrilHistoryRouter
