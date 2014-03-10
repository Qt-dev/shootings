SearchView = Backbone.View.extend({
  el: '#search-box',
  events: {
  //   'keyup #search-textbox': 'searchShootings',
      'click #submit-search' : 'searchByMovie'
  },

  searchByMovie: function(){
    title = $('#search-textbox').val();
    this.collection.trigger('filter');
  }
});