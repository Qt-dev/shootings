SearchView = Backbone.View.extend({
  el: '#search-box',
  events: {
      'keyup #search-textbox': 'autoComplete',
      'click #submit-search' : 'searchByMovie'
  },

  searchByMovie: function(){
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