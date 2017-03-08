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

const paddingStyles = {
  padding: '1%',
};

render(
  <div style={paddingStyles}>
    <a
      href={webpack2Url}
      target='_blank'
      onClick={e => {
        e.preventDefault();
        System.import('./modules/some-module').then(SomeModule => {
          console.log(`received module: ${JSON.stringify(SomeModule.db)}`);
          SomeModule.default('ES6 modules success!'); // because of export default ...
          console.log(`module ${SomeModule.name} is updated`);
        });
      }}>
      <div>meet webpack 2!</div>
      <div>
        open developer tool, network and click to test lazy loading using ES6 modules
      </div>
    </a>
  </div>,
  target);
