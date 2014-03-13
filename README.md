# Movie shooting locations in San Francisco
View this on [Heroku](http://movie-shootings-in-sf.herokuapp.com/jasmine)
By Quentin Devauchelle - [LinkedIn](http://www.linkedin.com/profile/view?id=160320613) / [Blog](http://qt-dev.tumblr.com)

## Stack
### Backend
* [Flask](http://flask.pocoo.org)
* [Request (HTTP Request simplifaction library)](http://docs.python-requests.org/en/latest/)
* [Webassets (Python's asset management)](http://webassets.readthedocs.org/en/latest/)
* [Unittest](http://docs.python.org/2/library/unittest.html)

### Frontend

* [BackboneJs](http://backbonejs.org/)
* [Twitter's Bootstrap](http://getbootstrap.com/)
* [Google Maps JS API V3](https://developers.google.com/maps/documentation/javascript/) for the map and the geolocalisation
* [Jasmine](http://jasmine.github.io/)
* [Sinon](http://sinonjs.org/)

* [SFData](http://sfdata.org)

## Backend
I chose a very minimal backend, in Python. It was my first time using a web framework in Python, and I learned how to do so in the process.
I chose the most minimal backend I could have, to have just the home route and another restful one that would get info from sfdata.org, filter it and get it back to Backbone.
Then, I added a route to the jasmine page, for JS tests.

It is tested to make sure the data is never empty, and that the library I use (Backbone and its requirements) are required in the view.

## Frontend
It was my first time using Google Maps API, and Backbone. I learned a lot about it, and I am glad I did.

The tests I have for [jasmine](http://movie-shootings-in-sf.herokuapp.com/jasmine) are just testing core features of the javascript backend. It was also my first time using Sinon, and Jasmine that much. Testing Backbone was interesting though


## If I had more time
If I had more time, I would test a bit more the javascript part and particularly the view.
I would also try my luck with integration tests with [PhantomJs](http://phantomjs.org).

