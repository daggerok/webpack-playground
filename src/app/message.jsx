import React from 'react';

import { Cat } from './cat'

export let Message = () => (
  <div>
    <div>
      <span class="grey">this is a </span>
      <strong class="red">react </strong>
      <span class="blue">app.</span>
    </div>
    <br/>
    <Cat />
  </div>
);
