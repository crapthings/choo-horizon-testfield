require('./model')

module.exports = function (params, state, send) {
  return html`
    <div>
    	<div>
    		<button onclick=${create}>add new post</button>
    		<button onclick=${remove}>remove all</button>
    	</div>
    	${state.posts.map(post => {
    		return html`
    			<p>${post.title}</p>
    		`
    	})}
    </div>
  `

  function create(e) {
  	send('create')
  }

  function remove(e) {
  	send('remove')
  }
}
