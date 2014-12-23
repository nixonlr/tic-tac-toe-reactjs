'use strict';

describe('Main', function () {
  var TicTacToeApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TicTacToeApp = require('../../../src/scripts/components/TicTacToeApp.jsx');
    component = TicTacToeApp();
  });

  it('should create a new instance of TicTacToeApp', function () {
    expect(component).toBeDefined();
  });
});
