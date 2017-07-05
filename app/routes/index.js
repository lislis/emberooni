import Ember from 'ember';
import config from 'emberooni/config/environment';
import moment from 'moment';

export default Ember.Route.extend({
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
    let daysPast = parseInt(transition.queryParams.daysPast);
    let country = transition.queryParams.country || null;
    let timeAgo = moment().subtract(daysPast, 'days').format();
    let lastDateInModel = files.get('lastObject.testStartTime');
    let offset = files.get('content.length');

    let self = this;

    loadChunks();

    function loadChunks () {
      console.log('calling AFTER MODEL LOAD CHUNK');
      if (lastDateInModel > timeAgo) {
        self.get('store')
            .query('file', { offset: offset, limit: 500 })
            .then(x => {
              lastDateInModel = x.get('lastObject.testStartTime');
              offset = offset + x.get('length');
              loadChunks();
            });
      }
    }
  }
});
