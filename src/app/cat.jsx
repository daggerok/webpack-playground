import React, { Component } from 'react';

export class Cat extends Component {
  render() {
    return <img src={require('../assets/images/cat.jpg')}></img>;
  }
}
