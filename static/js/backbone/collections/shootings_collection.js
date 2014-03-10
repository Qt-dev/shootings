ShootingCollection = Backbone.Collection.extend({
  model: Shooting,
  url: '/shootings',

  byMovie: function(movie) {
    filtered = this.filter(function(shooting) {
      return shooting.get("title") === movie;
    });
    return new ShootingCollection(filtered);
  }
});

