window.faker = require('faker')

const choo = require('choo')

const html = choo.view

const components = require('./components')

const app = choo()

const horizon = Horizon()

window.Posts = horizon('posts')

app.model({
  state: {
    posts: []
  },
  subscriptions: [
    send => {
      Posts.watch().subscribe(resp => {
        console.log(resp)
        send('fetch', { posts: resp })
      })
    }
  ],
  reducers: {
    fetch (action, state) {
      return { posts: action.posts }
    },

    // create (action, state) {
    //   state.posts.push({ title: faker.lorem.sentence() })
    // }
  },
  effects: {
    create (action, state) {
      Posts.store({ title: faker.lorem.sentence() })
    },

    remove (action, state) {
      console.log(state)
      Posts.removeAll(state.posts)
    }
  }
})

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
