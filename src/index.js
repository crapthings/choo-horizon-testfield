const choo = require('choo')

const html = choo.view

const components = require('./components')

const app = choo()

app.router(route => [
  route('/', layout(components.home)),
  route('/about', layout(components.about))
])

const view = app.start()

document.body.appendChild(view)

function layout (render) {
  return function (params, state) {
    return html`
      <div>
        ${components.layout.header()}
        ${render()}
      </div>
    `
  }
}
