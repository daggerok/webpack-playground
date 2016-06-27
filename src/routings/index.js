/**
 * Created by mak on 6/27/16.
 */
import { module } from '../module';
import homeTemplate from '../htmls/home.tpl.html';
import friendsTemplate from '../htmls/friends.tpl.html';
import { name as homeControllerName } from '../controllers/homeController';

module.config([

  '$stateProvider', '$urlRouterProvider', 'ngToastProvider',
  ($stateProvider, $urlRouterProvider, ngToastProvider)  => {

    ngToastProvider.configure({
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      combineDuplications: true,
      dismissOnClick: true,
      animation: 'slide',
      timeout: 10000,
      maxNumber: 10
    });

    $urlRouterProvider

      .otherwise('/');

    $stateProvider

      .state('/', {
        url: '/',
        template: homeTemplate,
        controller: homeControllerName
      })

      .state('/friends', {
        url: '/friends',
        template: friendsTemplate
      });

  }]);
