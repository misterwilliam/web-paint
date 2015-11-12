/* @flow */

var React = require('react');
var { Dispatcher } = require('flux');

var { RegisterForDispatchesMixin } = require('./utils');

var StatusBar = React.createClass({

  contextTypes: {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  },

  mixins: [
    RegisterForDispatchesMixin({
      getDispatcher: function() {
        return this.context.dispatcher;
      },
      handleDispatches: function(payload) {
        this.handleDispatches(payload);
      }
    })
  ],

  getInitialState: function() {
    return {
      status: ""
    }
  },

  render: function(): ?ReactElement {
    return (
      <div>
        Current tool: {this.state.status}
      </div>
    )
  },

  handleDispatches: function(payload: Object) {
    if (payload.actionType == "status-update") {
      this.setState({status: payload.status});
    }
  }
});

module.exports = StatusBar;