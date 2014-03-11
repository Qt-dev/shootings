App = Backbone.View.extend({
    el: 'body',

    initialize: function() {
      this.shootings = new ShootingCollection();
      this.SearchView = new SearchView({
        collection: this.shootings
      });
      this.mapView = new MapView({
        collection: this.shootings
      });
    }
  });

$(document).ready(function(){
  app = new App();
});