import { module } from '../module';

/**
 * Created by mak on 6/24/16.
 */
export const name = 'toastService';

module.factory(name, ['ngToast', function(ngToast) {
  return {

    ok: (response) => {
      console.log('response:', response && response.data ? response.data : response);
      if (response && response.data) {
        ngToast.info(JSON.stringify(response.data));
      }
    },

    err: (error) => {
      console.log(error);
      if (error) {
        ngToast.danger('error:', JSON.stringify(error) || 'unknown');
      }
    }
  }

}]);
