Shooting = Backbone.Model.extend({
  urlRoot: '/shootings',
  latitude: null,
  longitude: null,
  // To set the geocode of only those we need, when we need them.
  setGeocode: function(){
    // Adds San Francisco to the address.
    // It was either that or limiting more or less to San Francisco by the coordinates
    address = this.locations + 'San Francisco, CA';

    // Small tweak to be able to change the coordinates
    var self = this;
    this.collection.geocoder.geocode({ address: address }, function(response){
      self.latitude=response[0].geometry.location.d;
      self.longitude=response[0].geometry.location.e;
    });
  }
});