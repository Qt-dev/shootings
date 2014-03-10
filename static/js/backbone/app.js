$(document).ready(function(){
  shootings = new ShootingCollection();
  shootings.fetch();
  mapView = new MapView({ collection: this.shootings });
});