/**
 * @fileoverview The App Landing View service.
 */

goog.provide('app.landingView.LandingView');



/**
 * The Landing View service.
 * @param {!app.apiProxy.ApiProxy} apiProxy The App Api Proxy service.
 * @constructor
 * @ngInject
 */
app.landingView.LandingView = function(apiProxy) {
  /**
   * Injected services.
   * @const
   * @private
   */
  this.ij_ = {
    apiProxy: apiProxy
  };
};
