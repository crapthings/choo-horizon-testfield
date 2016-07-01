const choo = require('choo')

// global

window._ = require('lodash')

window.moment = require('moment')

window.faker = require('faker')

window.horizon = Horizon()

window.html = choo.view

window.app = choo()

window.components = require('./components')

app.router(route => [
  route('/', layout(components.home)),
  route('/about', layout(components.about))
])

const view = app.start()

document.body.appendChild(view)

function layout (render) {
  return function (params, state, send) {
    return html`
      <div>
        ${components.layout.header()}
        ${render(params, state, send)}
      </div>
    `
  }
}
