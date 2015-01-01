/**
 * @fileoverview App Api Proxy service.
 *
 * Usage :
 *   The Api Proxy service maintains active and inactive relationships.
 *   For example clicking a button in one service uses the this service
 *   to change the state in another service, without those two services
 *   creating a mutual dependency between themselves.
 */

goog.provide('app.apiProxy.ApiProxy');
goog.provide('app.apiProxy.module');

goog.require('app.utils.Constants');



/**
 * The Api Proxy service allows other services to communicate to the server.
 * @param {!angular.Q} $q service.
 * @param {!angular.RootScope} $rootScope service.
 * @constructor
 * @ngInject
 */
app.apiProxy.ApiProxy = function($q, $rootScope) {

  /**
   * Injected services.
   * @const
   * @private
   */
  this.ij_ = {
    q: $q,
    rootScope: $rootScope
  };

  /**
   * Google api.
   * @type {?gapi}
   */
  this.API;

  /**
   * Initialize watchers.
   */
  this.watchers_;
};


/**
 * Initializes the GAE API client library.
 */
app.apiProxy.ApiProxy.prototype.watchers_ = function() {
  var self = this;
  var apiReadyEvent = app.utils.Constants.Events.API_READY;
  self.ij_.rootScope.$on(apiReadyEvent, goog.bind(self.setAPI_, self));
};


/**
 * Initializes the GAE API client library.
 */
app.apiProxy.ApiProxy.prototype.setAPI_ = function() {
  this.API = gapi.client.api;
};


// CRUD requests here.


/**
 * Angular module.
 * @type {!angular.module}
 */
app.apiProxy.module = angular.module('app.apiProxy', []).
    service('apiProxy', app.apiProxy.ApiProxy);
