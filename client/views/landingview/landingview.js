/**
 * @fileoverview The Landing View module.
 */

goog.provide('app.landingview.module');

goog.require('app.apiProxy.module');
goog.require('app.landingView.LandingView');
goog.require('app.landingView.LandingViewCtrl');


/**
 * The landingview module
 * @type {!angular.Module}
 */
app.landingview.module = angular.module('app.landingView', [
  app.apiProxy.module.name
]).
    controller('LandingViewCtrl', app.landingView.LandingViewCtrl).
    service('landingView', app.landingView.LandingView);
