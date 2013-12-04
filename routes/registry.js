/*!
 * cnpmjs.org - routes/registry.js
 *
 * Copyright(c) cnpmjs.org and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  dead_horse <dead_horse@qq.com>
 *  fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var mod = require('../controllers/registry/module');
var pkg = require('../controllers/registry/package');
var tag = require('../controllers/registry/tag');

function routes(app) {
  app.get('/:name', mod.show);
  app.put('/:name', mod.update);

  // put tarball
  // https://registry.npmjs.org/cnpmjs.org/-/cnpmjs.org-0.0.0.tgz/-rev/1-c85bc65e8d2470cc4d82b8f40da65b8e
  app.put('/:name/-/:filename/-rev/:rev', pkg.upload);
  // tag
  app.put('/:name/:version/-tag/latest', tag.updateLatest);
}

module.exports = routes;