from flask import Flask, render_template
import requests, json
from flask.ext.assets import Environment, Bundle

app = Flask(__name__)
assets = Environment(app)


# Bundle the needed libraries
js = Bundle('js/lib/*.js')
assets.register('js_libs', js)

# Bundle the backbone files
bb = Bundle('js/backbone/**/*.js', 'js/backbone/*.js',
        filters='jsmin',
        output='gen/app.js')
assets.register('app_js', bb)


@app.route('/')
def home():
  return render_template('home.html')

@app.route('/shootings', methods=["GET"])
def get_shootings():
  # Get info about the shootings
  shootings = get_shootings_from_api()

  # Transform the list returned by the url into a json list
  return json.dumps(shootings)


# API helper.
# It gets data from the API, in case we implement an alternative DB saving path one day.
def get_shootings_from_api():
  res = requests.get("http://data.sfgov.org/resource/yitu-d5am.json")
  return res.json()



if __name__ == '__main__':
  app.run(debug=True)