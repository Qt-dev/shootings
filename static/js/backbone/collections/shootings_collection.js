ShootingCollection = Backbone.Collection.extend({
    model: Shooting,
    url: '/shootings',
    filteredShootings: null,
    titles: null,
    geocoder: new google.maps.Geocoder(),

    initialize: function() {
        this.listenTo(this, 'filter', this.byMovie);
    },

    byMovie: function(movie) {

        movie = movie.toLowerCase();
        var filtered = this.filter(function(shooting) {
            var title = shooting.get("title").toLowerCase();
            return (title.indexOf(movie) !== -1);
        });

        _.each(filtered, function(shooting) {
            if (shooting.position === null) {
                shooting.setGeocode();
            }
        });

        this.filteredShootings = new ShootingCollection(filtered);


        this.trigger('filtered', this.filteredShootings.models);
    },

    setTitles: function() {
        var titles = [];
        _.each(this.models, function(shooting) {
            titles.push(shooting.get("title"));
        });
        this.titles = _.uniq(titles);
    }


});