import Ember from 'ember';
import { COUNTRIES_LIST, getCountry } from 'ember-countries';

export default Ember.Controller.extend({
    queryParams: ['country'],
    country: null,

    countryList: COUNTRIES_LIST,

    uniqCountries: Ember.computed.uniqBy('model', 'country'),

    filtered: Ember.computed('country', 'model', function() {
        let country = this.get('country');
        let model = this.get('model');

        if (country) {
            return model.filterBy('country', country);
        } else {
            return model;
        }
    }),
    actions: {
        setCountry(param) {
            this.set('country', param);
        }
    }
});
