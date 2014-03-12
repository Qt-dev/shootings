describe("Shooting Model", function() {
  beforeEach(function(){
    this.shooting = new Shooting({
      title: "Test movie"
    });
  });

  it("should exist", function() {
    expect(Shooting).toBeDefined();
  });

  it("should have a position", function(){
    expect(this.shooting.position).toBeDefined();
  });

  it("should call geocode of collection's geocoder when geocoding", function() {

    // Create a fake Geocoder
    var geocoder = {
      geocode: function(){
      }
    };
    // Pass it to the shooting to mock the collection's geocoder's behavior
    this.shooting.collection = {
      geocoder: geocoder
    };
    // Attach the spy to the method
    spyOn(geocoder, 'geocode');

    // Call the method
    this.shooting.setGeocode();

    // Check if Spy was called
    expect(geocoder.geocode).toHaveBeenCalled();
  });

});


describe("Shooting Collection", function(){
  it("should exist", function(){
    expect(ShootingCollection).toBeDefined();
  });


});

describe("Map View", function(){
  it("should exist", function(){
    expect(MapView).toBeDefined();
  });
});

describe("Searching View", function(){
  it("should exist", function(){
    expect(SearchView).toBeDefined();
  });
});