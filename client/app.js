/**
 * @fileoverview Main applicaiton.
 */

goog.require('app.config.module');
goog.require('app.controllers.module');
goog.require('app.routes.module');


/**
 * The main module.
 * {!angular.Module}
 */
app.module = angular.module('app', [
  app.config.module.name,
  app.controllers.module.name,
  app.routes.module.name,
  'ngSanitize',
]);
