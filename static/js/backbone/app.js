$(document).ready(function(){
  shootings = new Shootings();
  shootings.fetch();
  mapView = new MapView({ collection: this.shootings });
});