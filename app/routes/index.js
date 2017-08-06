import Ember from 'ember';
import config from 'emberooni/config/environment';
import moment from 'moment';

export default Ember.Route.extend({
  fileService: Ember.inject.service('fetch-files'),

  queryParams: {
    daysPast: {
      refreshModel: true
    },
    country: {
      refreshModel: true
    }
  },

  model() {
    console.log('CALLING MODEL');
    return this.get('store').findAll('file');
  },

  afterModel(files, transition) {
    this.set('fileService.offset', files.get('content.length'));
    this.set('fileService.daysInPast', parseInt(transition.queryParams.daysPast) || 5);
    this.set('fileService.selectedCountry', transition.queryParams.country || null);
    this.set('fileService.daysDifference', moment().subtract(this.get('fileService.daysInPast'), 'days').format());
    this.set('fileService.lastAvailDate', files.get('lastObject.testStartTime'));

    let self = this;

    loadChunks();

    //this.get('fileService.loadChunks')();

    function loadChunks () {
      console.log('calling AFTER MODEL LOAD CHUNK');
      if (self.get('fileService.shouldFetchMore')) {
        self.get('store')
            .query('file', {
              offset: self.get('fileService.offset'),
              limit: self.get('fileService.limit')
            }).then(x => {
              self.set('fileService.lastAvailDate', x.get('lastObject.testStartTime'));
              self.set('fileService.offset', self.get('fileService.offset') + x.get('length'));
              loadChunks();
            });
      }
    }
  },

  actions: {
    loadMoreDays() {
      console.log(this.get('model.length'), this.get('model.lastObject.testStartTime'));
    }
  }
});
