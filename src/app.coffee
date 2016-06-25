$ = require 'jquery'
app = $ '#app'
message = require './app/message'

app
  .hide()
  .html(message)
  .fadeIn(1000)
