ShootingCollection = Backbone.Collection.extend({
  model: Shooting,
  url: '/shootings',
  filteredShootings: null,
  titles: null,

  initialize: function(){
    this.listenTo(this, 'filter', this.byMovie);

    var self = this; //To access the collection inside the completed method
    this.fetch()
      .complete(function(){
        self.setTitles();
    });
  },

  byMovie: function(movie) {
    filtered = this.filter(function(shooting) {
      return(shooting.get("title").indexOf(movie) !== -1);
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

