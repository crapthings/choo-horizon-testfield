const html = require('choo').view

module.exports = {
  header
}

function header() {
  return html `
    <ul>
      <li>
        <a href="/">home</a>
      </li>
      <li>
        <a href="/about">about</a>
      </li>
    </ul>
  `
}
