ShootingCollection = Backbone.Collection.extend({
  model: Shooting,
  url: '/shootings',
  filteredShootings: null,

  initialize: function(){
    this.listenTo(this, 'filter', this.byMovie);
  },

  byMovie: function(movie) {
    filtered = this.filter(function(shooting) {
      return shooting.get("title") === movie;
    });
    this.filteredShootings = new ShootingCollection(filtered);

    this.trigger('filtered');
  }


});

