$(document).ready(function(){
  shootings = new ShootingCollection();
  shootings.fetch();

  mapView = new MapView({ collection: shootings });
  searchView = new SearchView({ collection: shootings  });
});