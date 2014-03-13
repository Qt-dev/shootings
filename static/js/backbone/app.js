App = function() {
    var self = this;
    this.shootings = new ShootingCollection();
    this.shootings.fetch()
        .complete(function() {
            self.shootings.setTitles();
        });
    this.SearchView = new SearchView({
        collection: this.shootings
    });
    this.mapView = new MapView({
        collection: this.shootings
    });
};

$(document).ready(function() {
    app = new App();
});