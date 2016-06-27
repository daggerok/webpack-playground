/**
 * Created by mak on 6/23/16.
 */
import { module } from '../module';
import { name as peopleServiceName } from '../factories/peopleService';

export const name = 'homeController';

module.controller(name, [
  '$scope', peopleServiceName,
  ($scope, peopleService) => {

    $scope.title = 'people';
    $scope.person = {};
    $scope.people = [];
    // view variables:
    $scope.editMode;
    $scope.name;

    peopleService.findAll().then(response =>
      $scope.people = response);

    $scope.save = (name) => 
      peopleService.save(name).then(person => {
        $scope.person.name = '';
        $scope.people.push(person);
      });

    $scope.update = (person) =>
      peopleService.update(person);

    $scope.remove = (id, index) => 
      peopleService.delete(id).then(response => 
        $scope.people.splice(index, 1));
}]);
