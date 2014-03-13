MapView = Backbone.View.extend({
    el: 'div#map-canvas',

    initialize: function() {
        this.listenTo(this.collection, 'filtered', this.addPins);
        this.listenTo(this.collection, 'closePins', this.closePins);

        // I add a function that resizes the container of that map when the window is resized, then I resized to give it the right size.
        $(window).resize(function() {
            $("#map-container").height($(window).height() - 51);
        }).resize();

        var mapOptions = {
            center: new google.maps.LatLng(37.7922100, -122.4061410),
            zoom: 12
        };

        this.map = new google.maps.Map(this.el, mapOptions);

        this.pins = [];
    },

    addPins: function(models) {
        var self = this;
        this.clearPins();

        _.each(models, function(shooting) {
            self.addOnePin(shooting);
        });

    },

    addOnePin: function(shooting) {
        var self = this;

        if (shooting.position === null) {
            setTimeout(function() {
                self.addOnePin(shooting);
            }, 300);
        } else {
            var marker = new PinView({
                collection: self.collection,
                model: shooting,
                map: self.map
            });

            self.pins.push(marker);
        }
    },


    closePins: function() {
        _.each(this.pins, function(pin) {
            pin.infowindow.close();
        });
    },

    clearPins: function() {
        var self = this;
        _.each(this.pins, function(pin) {
            pin.setMap(null);
        });
        this.pins = [];
    }

});