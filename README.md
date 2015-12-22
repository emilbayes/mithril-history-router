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

API
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
