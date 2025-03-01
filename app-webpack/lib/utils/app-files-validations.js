const fs = require('node:fs')

const { warn } = require('./logger.js')
const appPaths = require('../app-paths.js')

module.exports.appFilesValidations = function appFilesValidations (cfg) {
  let error = false

  const file = appPaths.resolve.app(cfg.sourceFiles.indexHtmlTemplate)
  const content = fs.readFileSync(file, 'utf-8')

  if (content.indexOf('<base href') > -1) {
    warn(`Please remove the <base> tag from /src/index.template.html
   This is taken care of by Quasar automatically.
  `)
    error = true
  }

  if (!/<div id=['"]q-app/.test(content)) {
    warn(`Please add back <div id="q-app"></div> to
    /src/index.template.html inside of <body>\n`)
    error = true
  }

  if (error === true) {
    process.exit(1)
  }
}
