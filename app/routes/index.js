import Ember from 'ember';
import config from 'emberooni/config/environment';
import moment from 'moment';

export default Ember.Route.extend({
    model() {
        return this.get('store').findAll('file');
    },
    afterModel(files) {
        let oneWeekAgo = moment().subtract(7, 'days').format();
        let lastDateInModel = files.get('lastObject.testStartTime');
        let offset = files.get('content.length');

        let self = this;
        loadChunks();

        function loadChunks () {
            if (lastDateInModel > oneWeekAgo) {
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
