/**
 * Created by mak on 6/26/16.
 */
import angular from 'angular';
import './vendors';
import './styles';

import { app, appCtrl } from './components/app';
import { ppa, ppaCtrl } from './components/app/ppa';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  // directives:
  .directive('app', app)
  .directive('ppa', ppa)
  // controllers:
  .controller('appCtrl', appCtrl)
  .controller('ppaCtrl', ppaCtrl)
  // services and so on...
  ;

export default MODULE_NAME;
