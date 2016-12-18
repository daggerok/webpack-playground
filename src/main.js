import React from 'react';
import { render } from 'react-dom';

import './main.styl';

const webpack2Url = 'https://webpack.js.org/';
const target = document.querySelector('.app');
// const app = (props) => (
//   <a target='_blank' href={webpack2Url}>meet webpack 2</a>
// );
//
// render(React.createElement(app), target);

render(
  <a target='_blank' href={webpack2Url}>meet webpack 2</a>,
  target
);
