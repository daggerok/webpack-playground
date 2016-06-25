/**
 * Created by mak on 6/25/16.
 */
import $ from 'jquery';

import { message } from './app/message';

$('#app')
  .hide()
  .html(message)
  .fadeIn(1000);
