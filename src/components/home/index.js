module.exports = function (params, state, send) {
  return html`
  	<div>
  		<h1>你有${state.posts.length}篇文章</h1>
	    ${components.posts(params, state, send)}
    </div>
  `
}
