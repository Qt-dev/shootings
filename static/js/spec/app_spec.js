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
  beforeEach(function(){
    // Create a fakeserver to test fetch
    this.server = sinon.fakeServer.create();
    // Create a collection to test
    this.shootings = new ShootingCollection();
  });

  afterEach(function(){
    this.server.restore();
  });


  it("should exist", function(){
    expect(ShootingCollection).toBeDefined();
  });

  it("should fetch the data on the right route when created", function(){
    this.shootings.fetch();
    expect(this.server.requests.length)
      .toEqual(1);
    expect(this.server.requests[0].method)
      .toEqual("GET");
    expect(this.server.requests[0].url)
      .toEqual("/shootings");
  });
  it("should not throw errors when searching for a random movie", function(){
    var randomWord = Math.random().toString(36).substring(7);
    // We don't just need for it to not break, even if the word does not exist
    this.shootings.byMovie(randomWord);
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