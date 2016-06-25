/**
 * Created by mak on 6/25/16.
 */
const $ = require('jquery');
const message = require('./app/message').message;

$('#app')
  .hide()
  .html(message)
  .fadeIn(1000);
