// An object to create objects for the pin's infowindow
HtmlGenerator = {};
HtmlGenerator.generateTitle = function(title, year) {
    return ('<h4>' + title + ' (' + year + ')</h4>');
};
HtmlGenerator.generateDescription = function(locations, director) {
    return (
        "<br><p><strong>Director:</strong> " + director + "</p><p><strong>Location:</strong> " + locations + "</p><br>"
    );
};
HtmlGenerator.generateFooter = function(title, year) {
    return ("<a href='http://www.imdb.com/find?q=" + title + '(' + year + ")&s=all'>Check the movie on IMDB</a>");
};

HtmlGenerator.generateText = function(model) {
    var attributes = model.attributes;
    var text = this.generateTitle(attributes.title, attributes.release_year) + this.generateDescription(attributes.locations, attributes.director) + this.generateFooter(attributes.title, attributes.release_year);
    return ('<div id="infowindow">' + text + '</div>');
};

// The pin view
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

        var description = HtmlGenerator.generateText(options.model);

        // marker's popup
        this.infowindow = new google.maps.InfoWindow({
            content: description,
            maxWidth: 200
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