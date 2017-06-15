import DS from 'ember-data';
import config from 'emberooni/config/environment';

export default DS.JSONAPIAdapter.extend({
    host: config.apiEndpoint,
    namespace: config.apiNameSpace
});
