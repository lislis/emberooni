import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'https://measurements.ooni.torproject.org',
    namespace: 'api/v1'
});
