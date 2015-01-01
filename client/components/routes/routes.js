/**
 * @fileoverview module The route config.
 *
 * Usage:
 *   Uses HTML5 push state for route requests.
 *   Replaces /#/url with /url
 */

goog.provide('app.routes.module');

goog.require('app.landingview.module');
goog.require('app.utils.Constants');


/**
 * The application routes.
 * @param {!angular.LocationProvider} $locationProvider service.
 * @param {!angualar.RouteProvider} $routeProvider service.
 * @ngInject
 * @private
 */
app.routes.routesConfig_ = function($locationProvider, $routeProvider) {

  $locationProvider.html5Mode({ enabled: true, requireBase: false});

  $routeProvider.
      when(app.utils.Constants.Paths.LANDING, {
        templateUrl: app.utils.Constants.TemplateUrls.LANDING_VIEW,
        controllerAs: app.utils.Constants.Controllers.DEFAULT_CONTROLLER_AS
      }).
      otherwise({
        redirectTo: app.utils.Constants.Paths.ROOT
      });
};


/**
 * The routes module.
 * @type {!angular.Module}
 */
app.routes.module = angular.module('appRoutes', [
  app.landingview.module.name, 'ngRoute'
]).config([
  '$locationProvider', '$routeProvider',
  app.routes.routesConfig_
]);
