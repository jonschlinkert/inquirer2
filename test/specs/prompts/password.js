'use strict';

var expect = require('chai').expect;
var _ = require('lodash');

var ReadlineStub = require('../../helpers/readline');
var Password = require('../../../lib/prompts/password');
var fixtures = require('../../helpers/fixtures');

describe('`password` prompt', function() {
  beforeEach(function() {
    this.fixture = _.clone(fixtures.password);
    this.rl = new ReadlineStub();
  });

  it('should use raw value from the user', function(done) {
    var password = new Password(this.fixture, this.rl);
    password.run(function(answer) {
      expect(answer).to.equal('Inquirer');
      done();
    });
    this.rl.emit('line', 'Inquirer');
  });
});
