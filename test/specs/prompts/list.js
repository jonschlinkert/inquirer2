'use strict';

var expect = require('chai').expect;
var _ = require('lodash');

var ReadlineStub = require('../../helpers/readline');
var fixtures = require('../../helpers/fixtures');
var List = require('../../../lib/prompts/list');

describe('`list` prompt', function() {
  beforeEach(function() {
    this.fixture = _.clone(fixtures.list);
    this.rl = new ReadlineStub();
    this.list = new List(this.fixture, this.rl);
  });

  it('should default to first choice', function(done) {
    this.list.run(function(answer) {
      expect(answer).to.equal('foo');
      done();
    });

    this.rl.emit('line');
  });

  it('should move selected cursor on keypress', function(done) {
    this.list.run(function(answer) {
      expect(answer).to.equal('bar');
      done();
    });

    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.emit('line');
  });

  it('should allow for arrow navigation', function(done) {
    this.list.run(function(answer) {
      expect(answer).to.equal('bar');
      done();
    });

    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.input.emit('keypress', '', {
      name: 'up'
    });
    this.rl.emit('line');
  });

  it('should allow for vi-style navigation', function(done) {
    this.list.run(function(answer) {
      expect(answer).to.equal('bar');
      done();
    });

    this.rl.input.emit('keypress', 'j', {
      name: 'j'
    });
    this.rl.input.emit('keypress', 'j', {
      name: 'j'
    });
    this.rl.input.emit('keypress', 'k', {
      name: 'k'
    });
    this.rl.emit('line');
  });

  it('should loop the choices when going out of boundaries', function(done) {
    var i = 0;

    function complete() {
      i++;
      if (i === 2) {
        done();
      }
    }

    this.list.run(function(answer) {
      expect(answer).to.equal('bar');
      complete();
    });

    this.rl.input.emit('keypress', '', {
      name: 'up'
    });
    this.rl.input.emit('keypress', '', {
      name: 'up'
    });
    this.rl.emit('line');

    this.list.selected = 0; //reset
    this.list.run(function(answer) {
      expect(answer).to.equal('foo');
      complete();
    });

    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.emit('line');
  });

  it('should require a choices array', function() {
    var mkPrompt = function() {
      new List({
        name: 'foo',
        message: 'bar'
      });
    };
    expect(mkPrompt).to.throw(/choices/);
  });

  it('should allow a numeric default', function(done) {
    this.fixture.default = 1;
    var list = new List(this.fixture, this.rl);

    list.run(function(answer) {
      expect(answer).to.equal('bar');
      done();
    });

    this.rl.emit('line');
  });

  it('should work from a numeric default being the index', function(done) {
    this.fixture.default = 1;
    var list = new List(this.fixture, this.rl);

    list.run(function(answer) {
      expect(answer).to.equal('bum');
      done();
    });

    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.emit('line');
  });

  it('should allow a string default being the value', function(done) {
    this.fixture.default = 'bar';
    var list = new List(this.fixture, this.rl);

    list.run(function(answer) {
      expect(answer).to.equal('bar');
      done();
    });

    this.rl.emit('line');
  });

  it('should work from a string default', function(done) {
    this.fixture.default = 'bar';
    var list = new List(this.fixture, this.rl);

    list.run(function(answer) {
      expect(answer).to.equal('bum');
      done();
    });

    this.rl.input.emit('keypress', '', {
      name: 'down'
    });
    this.rl.emit('line');
  });

  it('shouldn\'t allow an invalid index as default', function(done) {
    this.fixture.default = 4;
    var list = new List(this.fixture, this.rl);

    list.run(function(answer) {
      expect(answer).to.equal('foo');
      done();
    });

    this.rl.emit('line');
  });

  it('should allow 1-9 shortcut key', function(done) {
    this.list.run(function(answer) {
      expect(answer).to.equal('bar');
      done();
    });

    this.rl.input.emit('keypress', '2');
    this.rl.emit('line');
  });
});
