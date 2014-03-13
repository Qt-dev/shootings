PinView = Backbone.View.extend({
    initialize: function(options) {
        var self = this;
        this.options = options;

        var title = options.model.attributes.title + ' - ' + options.model.attributes.locations;
        // put marker on map
        this.marker = new google.maps.Marker({
            position: options.model.position,
            map: options.map,
            title: title
        });

        var description = options.model.attributes.title + '(' + options.model.attributes.release_year + ')\n\n' + options.model.attributes.locations;

        // marker's popup
        this.infowindow = new google.maps.InfoWindow({
            content: description
        });

        google.maps.event.addListener(this.marker, 'click', function() {
            options.collection.trigger('closePins');
            options.model.trigger('showPins');
        });

        this.listenTo(options.model, 'showPins', this.showPin);
    },

    // shows the marker's infowindow
    showPin: function() {
        this.infowindow.open(this.options.map, this.marker);
    },
    setMap: function(map) {
        this.marker.setMap(map);
    }
});