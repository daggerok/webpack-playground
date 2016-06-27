/**
 * Created by mak on 6/24/16.
 */
import { module } from '../module';
import { name as friendsControllerName } from '../controllers/friendsController';
import peopleWithFriendsTemplate from '../htmls/friends/people-with-friends.tpl.html';

export const name = 'peopleWithFriends';

module.directive(name, () => {
  return {
    restrict: 'E',
    controller: friendsControllerName,
    template: peopleWithFriendsTemplate,
    scope: {
      message: '=' // looking for attr data-people; two-way data-binding
    },
    transclude: true,
    replace: true,
    link: (scope, element, attrs) => {
      console.log('arguments', arguments);
      element.on('click', () => {
        console.log(attrs.message);
        console.log('element ([0]) clicked:', element[0], 'with attributes:', attrs);
      });
    }
  };
});
