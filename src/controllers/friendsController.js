/**
 * Created by mak on 6/23/16.
 */
import { module } from '../module';
import { name as peopleServiceName } from '../factories/peopleService';

export const name = 'friendsController';

module.controller(name, [
  '$scope', peopleServiceName, 
  ($scope, peopleService)  => {

    $scope.title = 'friends';
    $scope.people = [];
    // view variables:
    $scope.friendsAreHidden;
    $scope.message;

    peopleService.findAll().then(response => {
      $scope.people = response;
      console.log($scope.message);
    });
}]);
