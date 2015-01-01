/**
 * @fileoverview The landingView controller.
 */

goog.require('app.utils.Constants');
goog.require('goog.array');

goog.provide('app.landingView.LandingViewCtrl');

/**
 * The Landing View controller.
 * @param {!angular.Scope} $scope service.
 * @param {!app.landingView.LandingView} landingView service.
 * @constructor
 * @ngInject
 */
app.landingView.LandingViewCtrl = function($scope, landingView) {
  /**
   * LandingView service.
   * @type {!app.landingView.LandingView}
   */
  this.landingView = landingView;
};
