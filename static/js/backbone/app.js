$(document).ready(function(){
  shootings = new ShootingCollection();

  mapView = new MapView({ collection: shootings });
  searchView = new SearchView({ collection: shootings  });


});