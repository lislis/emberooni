import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.get('store').query('file', {
            limit: 3000,
            since: '2017-05-01T10:30:00'
        });
    }
});
