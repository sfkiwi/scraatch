/**
 * @fileoverview app controllers module.
 */
goog.provide('app.controllers.module');

goog.require('app.controllers.MainCtrl');


/**
 * The controllers module.
 * @type {!angular.Module}
 */
app.controllers.module = angular.module('appControllers', [
  'ngRoute'
]).controller({
  'MainCtrl': app.controllers.MainCtrl
});
