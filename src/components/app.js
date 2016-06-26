import appTpl from './app.tpl.html';

export class appCtrl {
  constructor() {
    this.url = 'https://github.com/daggerok/webpack-playground/tree/angular';
  }
}

export const app = () => {
  return {
    template: appTpl,
    controller: 'appCtrl',
    controllerAs: 'app'
  }
};
