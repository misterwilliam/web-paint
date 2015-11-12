/* @flow */

var { Dispatcher } = require('flux');

var RegisterForDispatchesMixin = function(options: {
                                            getDispatcher: () => Dispatcher,
                                            handleDispatches: (payload: Object) => void,
                                          }): Object {
  return {
    componentWillMount: function() {
      this._registerForDispatches(options.getDispatcher.apply(this));
    },

    componentWillUnmount: function() {
      this._unregisterForDispatches(options.getDispatcher.apply(this));
    },

    _registerForDispatches: function(dispatcher) {
      this.dispatchToken = dispatcher.register(options.handleDispatches.bind(this));
    },

    _unregisterForDispatches: function(dispatcher) {
      dispatcher.unregister(this.dispatchToken);
    }
  }
}

module.exports.RegisterForDispatchesMixin = RegisterForDispatchesMixin;