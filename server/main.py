import os

from server.common import constants
from flask import Flask
from flask import render_template


APP = Flask(__name__, static_path=None, static_url_path='/client',
            static_folder='../client', template_folder='',
            instance_path=None, instance_relative_config=False)

is_dev = os.environ['SERVER_SOFTWARE'].startswith('Dev')

if is_dev:
  APP_ENV = "DEV"
  API_URL = constants.API_URL_DEV
else:
  APP_ENV = "PRODUCTION"
  API_URL = constants.API_URL_PRODUCTION


@APP.route('/', defaults={'path': ''})
@APP.route('/<path:path>')
def index(path):
  """Return the index page.

  Catch all non-static urls and let front-end handle routing.
  """
  return render_template('index.html', 
                         APP_ENV=APP_ENV,
                         apiNameSpace=constants.API_NAMESPACE,
                         apiVersion=constants.API_VERSION,
                         apiURL=API_URL)

@APP.errorhandler(404)
def page_not_found(e):
  """Return a custom 404 error."""
  return 'Sorry, Nothing at this URL.', 404


@APP.errorhandler(500)
def page_not_found(e):
  """Return a custom 500 error."""
  return 'Sorry, unexpected error: {}'.format(e), 500
