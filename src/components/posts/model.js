window.Posts = horizon('posts')

app.model({
  state: {
    posts: []
  },
  subscriptions: [
    send => {
      Posts.watch().subscribe(resp => {
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
      Posts.removeAll(state.posts)
    }
  }
})
