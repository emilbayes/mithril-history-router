`mithril-history-router`
================

An alternative to `m.route`. Exposes the History API using a thin Stack abstraction
with routing utility functions

Installation
------------

```sh
npm install mithril #peer dependency

npm install --save mithril-history-router
```

Example
---

```js

var m = require('mithril')
var r = require('mithril-history-router')

r.route(document.body, '/', {
  '/': {
    controller: function () {},
    view: function (ctrl) {
      return m('a[href=/other]', {config: r.anchor()})
    }
  },
  '/other': {
    controller: function () {},
    view: function (ctrl) {
      return m('h1', 'Page 2')
    }
  }
})
```

API
---

### Router

#### `r.router(rootElm, defaultRoute, routesHash)`

Takes DOM Element `rootElm` and mounts routes according to components in `routesHash`
as with `m.route(elm, default, routes)`. `defaultRoute` can be seen as an error state
as this is where the router will navigate to if there is not match found in `routesHash`.

Routes can contain `:param` and `*` splats. See [`http-hash`](https://github.com/Matt-Esch/http-hash) for details.

### Stack methods

#### `r.push(url, state)`

#### `r.replace(url, state)`

#### `r.pop()`

#### `r.peek()`

### Utilities

#### `r.anchor(state, operation)`

Similar to `{config: m.route}` except it allows you to pass a state object and
choose how the browser navigates using one of the stack methods. Defaults to `r.push`.
`state` is passed to the operation.

#### `r.state()`

#### `r.params()`

#### `r.splat()`
