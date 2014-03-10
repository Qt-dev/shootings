from flask import Flask, render_template
import requests, json
from flask.ext.assets import Environment, Bundle

app = Flask(__name__)

####################################
######### Assets bundling ##########
####################################
assets = Environment(app)

# Bundle the needed libraries
js = Bundle('js/lib/jquery.js',
            'js/lib/underscore.js',
            'js/lib/backbone.js')
assets.register('js_libs', js)

foundation = Bundle('js/lib/modernizr.min.js',
                    'js/lib/foundation.min.js')
assets.register('foundation', foundation)

# Bundle the backbone files
bb = Bundle('js/backbone/*.js',
        'js/backbone/models/*.js',
        'js/backbone/collections/*.js',
        'js/backbone/views/*.js',
        #filters='jsmin',
        #output='gen/app.js'
        )
assets.register('app_js', bb)

testjs = Bundle('js/spec/*.js')
assets.register('app_test', testjs)

####################################
##########  Flask Routes  ##########
####################################
@app.route('/')
def home():
  return render_template('home.html')

@app.route('/shootings', methods=["GET"])
def get_shootings():
  # Get info about the shootings
  shootings = get_shootings_from_api()

  # Transform the list returned by the url into a json list
  return json.dumps(shootings)

@app.route('/jasmine', methods=["GET"])
def get_jasmine():
  return render_template('jasmine.html')


####################################
############  Helpers  #############
####################################
# API helper.
# It gets data from the API, in case we implement an alternative DB saving path one day.
def get_shootings_from_api():
  res = requests.get("http://data.sfgov.org/resource/yitu-d5am.json").json()

  # Filter the shootings with no location
  res = filter_shootings(res)

  return res

def filter_shootings(shootings):
  result = []
  for shooting in shootings:
    if 'locations' in shooting:
      result.append(shooting)

  return result




if __name__ == '__main__':
  app.run(debug=True)