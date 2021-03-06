SearchView = Backbone.View.extend({
  el: '#search-box',
  events: {
      'keyup #search-textbox': 'autoComplete',
      'submit' : 'searchByMovie'
  },

  searchByMovie: function(e){
    e.preventDefault();
    title = $('#search-textbox').val();
    this.collection.trigger('filter', title);
  },

  autoComplete: function(test){
    $('#search-textbox').autocomplete({
      source: this.collection.titles,
      appendTo: "#ui-menu-container"
    });
  }

});