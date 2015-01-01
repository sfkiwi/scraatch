/**
 * @fileoverview Main Controller
 */

goog.provide('app.controllers.MainCtrl');



/**
 * The top level controller for the application
 * @param {!angular.Location} $location The Angular Location service.
 * @param {!angular.RootScope} $rootScope The Angular Root Scope service.
 * @constructor
 * @ngInject
 */
app.controllers.MainCtrl = function(
    $location, $rootScope) {
  /**
   * Injected services.
   * @private
   */
  this.ij_ = {
    loc: $location,
    rootScope: $rootScope
  };

  this.init_();
};


/**
 * Initializes watchers.
 * @private
 */
app.controllers.MainCtrl.prototype.init_ = function() {};
