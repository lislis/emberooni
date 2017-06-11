import DS from 'ember-data';

export default DS.Model.extend({
    index: DS.attr(),
    country: DS.attr('string'),
    asn: DS.attr('string'),
    testStartTime: DS.attr('string'),
    DownloadUrl: DS.attr('atring')
});
