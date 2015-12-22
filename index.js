var HttpHash = require('http-hash')
var m = require('mithril')

function MithrilRouter () {
  var _router
  var _dispatch

  return {
    router: router,

    // Routing utils
    anchor: anchor,
    params: params,
    state: state,
    splat: splat,

    // Stack operations
    peek: peek,
    replace: replace,
    push: push,
    pop: pop
  }

  function router (rootElm, defaultRoute, routes) {
    if (routes[defaultRoute] == null) throw new Error('defaultRoute must be present in routes')

    _router = HttpHash()

    _dispatch = function () {
      var url = window.location.pathname

      var resolvedRoute = _router.get(url)

      console.log(resolvedRoute)

      if (resolvedRoute.handler === null) {
        // window.location = defaultRoute
        return
      }

      m.mount(rootElm, resolvedRoute.handler)
    }

    for (var url in routes) {
      _router.set(url, routes[url])
    }

    _dispatch()

    window.addEventListener('popstate', _dispatch)
  }

  function anchor (state, shouldReplace) {
    return function (elm, isInit, context, vdom) {
      elm.removeEventListener('click', clickHandler, false)
      elm.addEventListener('click', clickHandler, false)

      function clickHandler (e) {
        e.preventDefault()

        ;(shouldReplace === true ? replace : push)(vdom.attrs.href, state)
      }
    }
  }

  function peek () {
    return {
      url: window.url,
      state: window.state,
      route: _router.get(window.url)
    }
  }

  function push (url, state) {
    window.history.pushState(state, null, url)
    _dispatch()
  }

  function replace (url, state) {
    window.history.replaceState(state, null, url)
    _dispatch()
  }

  function pop () {
    window.history.back()
    _dispatch()
  }

  function params () {
    return _router.get(window.location.pathname).params
  }

  function state () {
    return window.history.state
  }

  function splat () {
    return _router.get(window.location.pathname).splat
  }
}

module.exports = new MithrilRouter()
module.exports.MithrilRouter = MithrilRouter
