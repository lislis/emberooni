import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

    primaryKey: 'index',

    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        let json = {};
        json.data = payload.results.map((el) => {
            return {
                id: el.index,
                type: 'file',
                attributes: {
                    country: el.probe_cc,
                    asn: el.probe_asn,
                    testStartTime: el.test_start_time,
                    downloadUrl: el.download_url
                }
            };
        });
        json.meta = payload.metadata;

        delete payload.results;
        delete payload.metadata;

        return json;
    }
});
