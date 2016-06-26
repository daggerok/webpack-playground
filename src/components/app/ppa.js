import ppaTpl from './ppa.tpl.html';

export class ppaCtrl {
  constructor() {
    this.name = 'a ppaCtrl...';
  }
}

export const ppa = () => {
  return {
    template: ppaTpl,
    controller: 'ppaCtrl',
    controllerAs: 'ppa'
  }
};
