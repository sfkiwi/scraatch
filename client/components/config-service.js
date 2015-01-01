/**
 * @fileoverview App Config service.
 *
 * Usage:
 *   Provides convenience methods on top of
 *   Angular services. Define a function with
 *   A localized name of the service and include
 *   it in the run section of the module at the bottom.
 */

goog.provide('app.config');
goog.provide('app.config.module');

goog.require('app.utils.Constants');


/**
 * Default configuration values.
 * @param {!angular.Provide} $provide service.
 * @param {!angular.Window} $window service.
 * @private
 */
app.config.defaultsConfig_ = function($provide) {

  /**
   * The Server API namespace.
   */
  $provide.constant('apiNameSpace', '');

  /**
   * The Server API version.
   */
  $provide.constant('apiVersion', '');

  /**
   * The Server API URL.
   */
  $provide.constant('apiURL', '');
};


/**
 * Extend the $window service.
 * @param {!angualar.Window} $window service.
 * @ngInject
 * @private
 */
app.config.$window_ = function(
    $rootScope, $window, apiNameSpace, apiVersion, apiURL) {
  /**
   * Invoked from server/index.html.
   * Loads the JavaScript API client library.
   */
  $window.loadAPIs = function() {
    var readyEvent = app.utils.Constants.Events.API_READY;
    gapi.client.load(apiNameSpace, apiVersion, function() {
      $rootScope.$broadcast(readyEvent);
    }, apiURL);
  };
};


/**
 * A private module for defining config defaults.
 * @private {!angular.module}
 */
app.config.defaults_ = angular.module('app.config.defaults', []).
    config(['$provide', app.config.defaultsConfig_]);


/**
 * Angular module.
 * @type {!angular.module}
 */
app.config.module = angular.module('app.config', [
  app.config.defaults_.name]).run(app.config.$window_);


/**
 * Shortcut method for configuring settings externally.
 * @export
 */
app.config.set = goog.bind(app.config.module.constant, app.config.module);
