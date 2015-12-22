`mithril-router`
================

A dropin replacement for `m.route`

Installation
------------

```sh
npm install mithril #peer dependency

npm install --save mithril-router
```

API
---

```js

var m = require('mithril')
var r = require('mithril-router')

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
