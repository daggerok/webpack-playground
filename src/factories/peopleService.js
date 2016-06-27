/**
 * Created by mak on 6/24/16.
 */
import { module } from '../module';
import { name as toastServiceName } from './toastService';

export const name = 'peopleService';

module.factory(name, [
  '$http', toastServiceName,
  ($http, toastService) => {

    const URI = '/api/people';

    const ok = (response) => {
      if (response && response.data) {
        toastService.ok(response);
        return response.data;
      }
      return response;
    };

    const error = (error) => {
      toastService.err(error);
      return error;
    };

    return {

      findAll: () => $http.get(URI).then(ok, error),

      findAllById: (id) => $http.get(`${URI}/${id}`).then(ok, error),

      save: (name) => $http.post(URI, {name: name}).then(ok, error),

      update: (person) => $http.put(`${URI}/${person.id}`, person).then(ok, error),

      delete: (id) => $http.delete(`${URI}/${id}`)
    }

  }]);
