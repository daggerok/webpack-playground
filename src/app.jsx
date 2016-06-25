/**
 * Created by mak on 6/25/16.
 */
import React from 'react';
import { render } from 'react-dom';

import { Message } from './app/Message';

import './assets/app.css';
import './assets/app.scss';
import './assets/app.less';

render(<Message/>, document.getElementById('app'));
