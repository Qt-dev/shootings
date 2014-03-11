ShootingCollection = Backbone.Collection.extend({
  model: Shooting,
  url: '/shootings',
  filteredShootings: this.models,
  titles: null,
  geocoder: new google.maps.Geocoder(),

  initialize: function(){
    this.listenTo(this, 'filter', this.byMovie);

    var self = this; //To access the collection inside the completed method
    this.fetch()
      .complete(function(){
        self.setTitles();
    });
  },

  byMovie: function(movie) {

    movie = movie.toLowerCase();
    var filtered = this.filter( function(shooting) {
      var title = shooting.get("title").toLowerCase();
      return(title.indexOf(movie) !== -1);
    });

    _.each(filtered, function(shooting){
      shooting.setGeocode();
    });

    this.filteredShootings = new ShootingCollection(filtered);


    this.trigger('filtered');
  },

  setTitles: function(){
    var titles = [];
    _.each(this.models, function(shooting){
      titles.push(shooting.get("title"));
    });
    this.titles = _.uniq(titles);
  }


});

