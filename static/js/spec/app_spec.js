describe("Shooting Model", function() {
    beforeEach(function() {
        this.shooting = new Shooting({
            title: "Test movie"
        });
    });

    it("should have a position", function() {
        expect(this.shooting.position).toBeDefined();
    });

    it("should call geocode of collection's geocoder when geocoding", function() {

        // Create a fake Geocoder
        var geocoder = {
            geocode: function() {}
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


describe("Shooting Collection", function() {
    beforeEach(function() {
        // A fixture for a server response for the fetch
        this.fixture = this.fixtures.Shootings.valid;
        // Create a fakeserver to test fetch
        this.server = sinon.fakeServer.create();
        // Make it respond with the fixture
        this.server.respondWith(
            "GET",
            "/shootings", [
                200, {
                    "Content-Type": "applicaton/json"
                },
                JSON.stringify(this.fixture.response)
            ]
        );
        // Create a collection to test
        this.shootings = new ShootingCollection();

    });

    afterEach(function() {
        this.server.restore();
    });

    it("should fetch the data on the right route when created", function() {
        this.shootings.fetch();
        expect(this.server.requests.length)
            .toEqual(1);
        expect(this.server.requests[0].method)
            .toEqual("GET");
        expect(this.server.requests[0].url)
            .toEqual("/shootings");
    });
    it("should not throw errors when searching for a random movie", function() {
        var randomWord = Math.random().toString(36).substring(7);
        // We don't just need for it to not break, even if the word does not exist
        this.shootings.byMovie(randomWord);
    });

    it("should populate the models when fetching", function() {
        this.shootings.fetch();
        this.server.respond();
        expect(this.shootings.models.length).toEqual(this.fixture.response.length);
        for (var i in this.fixture.response) {
            expect(this.shootings.models[i].get("title")).toEqual(this.fixture.response[i].title);
        }
    });

    it("should filter the movies by the title when calling ByMovie", function() {
        this.shootings.fetch();
        this.server.respond();
        this.shootings.byMovie(this.fixture.response[0].title);
        expect(
            this.shootings.filteredShootings.models[0].get("title")
        ).toEqual(
            this.fixture.response[0].title
        );
    });

});

describe("Map View", function() {
    beforeEach(function() {
        $('body').append("<div id='map-canvas' />");
        this.shootings = new ShootingCollection();
        this.mapView = new MapView({
            collection: this.shootings
        });
    });
    afterEach(function() {
        $("<div id='map-canvas' />").remove();
    });

    it("should have a map and a pins array", function() {
        expect(this.mapView).toBeDefined();
        expect(this.mapView.pins).toBeDefined();
    });

    it("should add pins to the map when calling the corresponding function", function() {
        var shooting = new Shooting({
            attributes: {
                title: "test movie",
                director: "me",
                release_year: "2013",
                locations: "here"
            }
        });
        shooting.position = new google.maps.LatLng(123, -123);
        this.mapView.addOnePin(shooting);
        expect(this.mapView.pins.length).toEqual(1);
    });
});

describe("Searching View", function() {
    // No need to test more, it only calls Jquery UI...
    it("should exist", function() {
        expect(SearchView).toBeDefined();
    });
});

describe("Pin View", function() {
    it("should have a generateText method", function() {
        expect(HtmlGenerator.generateText).toBeDefined();
    });
});