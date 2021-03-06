/*!
 * cnpmjs.org - test/sync/sync_all.js
 *
 * Copyright(c) cnpmjs.org and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 */

'use strict';

/**
 * Module dependencies.
 */
var sync = require('../../sync/sync_all');
var mm = require('mm');
var Npm = require('../../proxy/npm');
var Total = require('../../proxy/total');
var should = require('should');
var Module = require('../../proxy/module');

describe('sync/sync_all.js', function () {
  describe('sync()', function () {
    afterEach(mm.restore);

    it('should sync first time ok', function (done) {
      mm.data(Npm, 'getShort', ['cnpmjs.org', 'cutter']);
      mm.data(Total, 'getTotalInfo', {last_sync_time: 0});
      sync(function (err, data) {
        should.not.exist(err);
        data.successes.should.eql(['cnpmjs.org', 'cutter']);
        mm.restore();
        Total.getTotalInfo(function (err, result) {
          should.not.exist(err);
          result.last_sync_module.should.equal('cutter');
          done();
        });
      });
    });

    it('should sync common ok', function (done) {
      mm.data(Npm, 'getAllSince', {
        _updated: Date.now(),
        'cnpmjs.org': {},
        cutter: {}
      });
      mm.data(Npm, 'getShort', ['cnpmjs.org', 'cutter', 'cnpm']);
      mm.data(Total, 'getTotalInfo', {last_sync_time: Date.now()});
      mm.data(Module, 'listAllModuleNames', [{name: 'cnpmjs.org'}, {name: 'cutter'}]);
      sync(function (err, data) {
        should.not.exist(err);
        data.successes.should.eql(['cnpm', 'cnpmjs.org', 'cutter']);
        done();
      });
    });
  });
});
