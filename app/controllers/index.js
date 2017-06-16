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

    days: Ember.computed(function () {
        let daysInPast = 7;
        // let weekAgo = moment().subtract(daysInPast, 'days').format();
        let days = [];
        for (let i = 0; i < daysInPast; i++) {
            days.push({
                prettyDate: moment().subtract(i, 'days').format('dddd, MMMM Do YYYY'),
                timestamp: moment().subtract(i, 'days').format()
            });
        }
        return days;
    }),

    timeline: Ember.computed('days', 'filtered.[]', function () {
        let days = this.get('days');
        let filtered = this.get('filtered');
        let timeline = [];

        days.forEach(function (v) {
            let dayData = {};
            dayData.day = v;
            let compareableDay = moment(v.timestamp).format('YYYY-MM-DD');
            dayData.files = filtered.filter((c) => {
                let compareableFileDate = moment(c.get('testStartTime')).format('YYYY-MM-DD');
                return compareableDay === compareableFileDate;
            });
            timeline.push(dayData);
        });
        return timeline;
    }),

    actions: {
        setCountry(param) {
            this.set('country', param);
        }
    }
});
