import Ember from 'ember';
import { COUNTRIES_LIST } from 'ember-countries';
import moment from 'moment';

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

    days: Ember.computed('model', function () {
        let arr= [];
        this.get('model').map((el) => {
            let startDate = el.get('testStartTime');
            let date = moment(startDate).format('MMM Do YYYY');

            if (!arr.includes(date)) {
                arr.push(date);
            }
        });
        return arr;
    }),

    actions: {
        setCountry(param) {
            this.set('country', param);
        }
    }
});
