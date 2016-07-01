const horizon = Horizon()

const choo = require('choo')
const app = choo()

const form2js = require('form2js').form2js

const Person = horizon('person')

const _ = require('lodash')

app.model({
  state: {
    title: 'Set the title',
    persons: [{
      name: 'zhang hong'
    }, {
      name: 'liu de hua'
    }, {
      name: 'zhang jin'
    }]
  },
  reducers: {
    update: (action, state) => {
      title: action.value
    },

    submit: (action, state) => {
      console.log(action, state)
    }
  },
  subscriptions: [
    send => {
      document.addEventListener("DOMContentLoaded", function (event) {
        console.log("DOM fully loaded and parsed");
      })
    }
  ]
})

const personFormView = (params, state, send) => {
  return choo.view `
    <form id='personForm' onsubmit=${submit}>
      <input type='text' name='name' autofocus />
      <input type='submit' value='submit' />
    </form>
  `

  function submit(e) {
    e.preventDefault()
    let data = form2js(e.currentTarget.id)
    send('submit', data)
  }
}

const personList = (params) => {
  console.log(params)
  return choo.view`
    <p>${params.name}</p>
  `
}

const mainView = (params, state, send) => {
  return choo.view `
    <div>
      ${personFormView(params, state, send)}
      ${state.persons.map(d => personList(d))}
    </div>
  `
}

app.router((route) => [
  route('/', mainView)
])

horizon.onReady(function () {
  document.querySelector('h1').innerHTML = 'horizon_testfield works!'
  const tree = app.start()
  document.body.appendChild(tree)
})

horizon.connect()
