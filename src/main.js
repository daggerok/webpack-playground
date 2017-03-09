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
  <div style={{ padding: '1%' }}>
    <a
      href={webpack2Url}
      target='_blank'
      onClick={e => {
        e.preventDefault();
        System.import('./modules/some-module').then(({ db, msg }) => {
          console.log(`module ${msg('ES6 modules success!')} is updated: ${db.counter}`);
        });
      }}>
        <div>webpack 2 and lazy loading using ES6 modules</div>
    </a>
  </div>,
  target
);
