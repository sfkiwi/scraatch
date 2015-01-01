/**
 * @fileoverview app common constants.
 *
 * Usage: goog.require('app.utils.Constants')
 *
 * By adding dependency, any of the available constants/ can be used.
 */

goog.provide('app.utils.Constants');


/**
 * Pub/Sub events.
 * @enum {string}
 */
app.utils.Constants.Events = {
  API_READY: 'apiReady'
};

/**
 * Paths URIs for use with client-to-client routing.
 * @enum {string}
 */
app.utils.Constants.Paths = {
  LANDING: '/',
  MAP: '/map',
  PROJECT: '/project',
  ROOT: '/',
  USER: '/user'
};


/**
 * Template URIs for use with the modal service.
 * @enum {string}
 */
app.utils.Constants.Controllers = {
  LANDING_VIEW: 'LandingViewCtrl',
  MAP_VIEW: 'MapViewCtrl',
  PROJECT_VIEW: 'ProjectViewCtrl',
  USER_VIEW: 'UserViewCtrl'
};


/**
 * The default controller 'as' setting.
 * @const {string}
 */
app.utils.Constants.Controllers.DEFAULT_CONTROLLER_AS = 'ctrl';


/**
 * Template URIs for use with the modal service.
 * @enum {string}
 */
app.utils.Constants.TemplateUrls = {
  LANDING_VIEW: '/client/views/landingview/landingview.ng',
  MAP_VIEW: '/client/views/mapview/mapview.ng',
  PROJECT_VIEW: '/client/views/projectview/projectview.ng',
  USER_VIEW: '/client/views/userview/userview.ng'
};

/**
 * List of USA states.
 * @const {Array}
 */
app.utils.Constants.US_STATES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
