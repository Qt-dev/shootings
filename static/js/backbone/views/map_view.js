MapView = Backbone.View.extend({
  el:'div#map-canvas',
  initialize: function(){

    // I add a function that resizes the container of that map when the window is resized, then I resized to give it the right size.
    $(window).resize(function(){
      $("#map-container").height($(window).height() - 51);
      }).resize();

    var mapOptions = {
      center: new google.maps.LatLng(37.7922100,-122.4061410),
      zoom: 14
    };

    this.map = new google.maps.Map(this.el, mapOptions);
  }

});