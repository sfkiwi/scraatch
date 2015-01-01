/**
 * @fileoverview App DataBase service.
 *
 * Usage :
 *   The DataBase service serves as a model proxy to the application data store.
 *   It provides services to store and retrieve application memory data.
 */

goog.provide('app.dB.DB');
goog.provide('app.dB.module');

goog.require('app.utils.Constants');
goog.require('goog.array');
goog.require('goog.object');



/**
 * The DB service allows internal services to store data to memory.
 * All DB operations return an Angular Q library Promise.
 * @constructor
 * @ngInject
 */
app.dB.DB = function($q) {
  /**
   * Injected services.
   * @const
   * @private
   */
  this.ij_ = {
    q: $q
  };

  /**
   * The local database.
   * @const {!Object}
   * @private
   */
  this.db_ = [];
};


/**
 * The DB find method.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.find = function(options) {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_);
  return deferred.promise;
};


/**
 * The DB find all method.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.findAll = function() {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_);
  return deferred.promise;
};


/**
 * The DB find one method.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.findOne = function(options) {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_.length ? this.db_[0] : this.db_);
  return deferred.promise;
};


/**
 * The DB find by Id method.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.findById = function(id) {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_.length ?
      goog.array.find(this.db_, function(e) {
        return e.id == id;
      }) : this.db_);
  return deferred.promise;
};


/**
 * The DB find last method. Returns the most recent entry.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.findLast = function() {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_.length ? this.db_[this.db_.length - 1] : this.db_);
  return deferred.promise;
};


/**
 * The DB update method based on the id property on the object.
 * @param {!Object} object The updated object attributes.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.update = function(object) {
  var deferred = this.ij_.q.defer();
  var validTransaction = !goog.array.isEmpty(this.db_) && goog.isDef(object.id);
  deferred.resolve(validTransaction ?
      this.findById(object.id).then(function(retrievedObj) {
        goog.object.extend(retrievedObj, object); return retrievedObj}) : []);
  return deferred.promise;
};


/**
 * The DB save method.
 * @param {!Object} object The object to save.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.save = function(object) {
  var deferred = this.ij_.q.defer();
  var dbSize = this.db_.length;
  deferred.resolve(this.db_.push(object) > dbSize ? object : []);
  return deferred.promise;
};


/**
 * The DB destroy method.
 * @param {number} index The index of the item to destroy.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.destroy = function(index) {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_.length ? this.db_[index].remove() : this.db_);
  return deferred.promise;
};


/**
 * The DB destroy all method.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.destroyAll = function() {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_ = []);
  return deferred.promise;
};


/**
 * The DB destroy last method.
 * @param {number} index The index of the item to destroy.
 * @return {!angular.Q.Promise}
 */
app.dB.DB.prototype.destroyLast = function(index) {
  var deferred = this.ij_.q.defer();
  deferred.resolve(this.db_.length ? this.db_.pop() : this.db_);
  return deferred.promise;
};



// Table specific DBs here.


/**
 * Angular module.
 * @type {!angular.module}
 */
app.dB.module = angular.module('app.dB', []).
    service('dB', app.dB.DB);
