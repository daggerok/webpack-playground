/**
 * Created by mak on 6/25/16.
 */
import './assets/app.scss';

import React from 'react';
import { render } from 'react-dom';

import { Message } from './app/Message';

render(<Message/>, document.getElementById('app'));
