MapView = Backbone.View.extend({
  el:'div#map-canvas',

  initialize: function(){
    this.listenTo(this.collection, 'filtered', this.addPins);

    // I add a function that resizes the container of that map when the window is resized, then I resized to give it the right size.
    $(window).resize(function(){
      $("#map-container").height($(window).height() - 51);
      }).resize();

    var mapOptions = {
      center: new google.maps.LatLng(37.7922100,-122.4061410),
      zoom: 12
    };

    this.map = new google.maps.Map(this.el, mapOptions);

    this.pins = [];
  },

  addPins: function(models){
    var self = this;
    this.clearPins();

    _.each(models, function(shooting){
      self.addOnePin(shooting);
    });

  },

  addOnePin: function(shooting){
    var self = this;

    if(shooting.position === null){
      setTimeout(function(){
        self.addOnePin(shooting);
      }, 300);
    }else{
      var marker = new google.maps.Marker({
        position: shooting.position,
        map: self.map,
        title: 'Hello World!'
      });
      self.pins.push(marker);
    }
  },

  clearPins: function(){
    var self = this;
    _.each(this.pins, function(pin){
      pin.setMap(null);
    });
    this.pins = [];
  }

});