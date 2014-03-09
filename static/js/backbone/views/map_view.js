MapView = Backbone.View.extend({
  el:'div#map-canvas',
  initialize: function(){


    var mapOptions = {
      center: new google.maps.LatLng(37.7922100,-122.4061410),
      zoom: 14
    };

    this.map = new google.maps.Map(this.el, mapOptions);
  }

});