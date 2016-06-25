/**
 * Created by mak on 6/25/16.
 */
import React from 'react';
import { render } from 'react-dom';

import { Message } from './app/Message';

import './assets/styles/app.css';
import './assets/styles/app.scss';
import './assets/styles/app.less';

render(<Message/>, document.getElementById('app'));
