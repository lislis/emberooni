import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),

  offset: 0,
  limit: 500,
  daysInPast: null,
  selectedCountry: null,
  daysDifference: null,
  lastAvailDate: null,

  shouldFetchMore: Ember.computed('lastAvailDate', 'daysDifference', function () {
    let lastAvailDate = this.get('lastAvailDate');
    let daysDifference = this.get('daysDifference');
    return lastAvailDate > daysDifference;
  }),

  // start load loop

  // computed property that then starts the recurevice loop

  loadChunks () {
    console.log('SERVICE CHUNK');
    debugger
    if (this.get('shouldFetchMore')) {
      this.get('store')
          .query('file', {
            offset: this.get('offset'),
            limit: this.get('limit')
          }).then(x => {
            this.set('lastAvailDate', x.get('lastObject.testStartTime'));
            this.set('offset', this.get('offset') + x.get('length'));
            this.get('loadChunks')();
          });
    }
  }
});
