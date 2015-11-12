/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');
var { Dispatcher } = require('flux');

var appDispatcher = new Dispatcher();

var ToolBar = React.createClass({

  contextTypes: {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  },

  render: function() {
    return (
      <div className="p4 flex flex-column border">
        <h1 className="mt2">Toolbar</h1>
        <div id="paintbrush"
             className="mt2 btn btn-primary black bg-silver"
             onClick={this.handleClick} >
          Paintbrush
        </div>
        <div id="rectangle"
             className="mt2 btn black bg-silver"
             onClick={this.handleClick} >
          Rectangle
        </div>
        <div id="floodfill"
             className="mt2 btn black bg-silver"
             onClick={this.handleClick} >
          Floodfill
        </div>
      </div>
    )
  },

  handleClick: function(event) {
    this.context.dispatcher.dispatch({
      actionType: "status-update",
      status: event.target.id
    })
  }
})

var Canvas = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Canvas</h1>
        <StatusBar />
        <canvas ref="canvas" className="border" />
      </div>
    )
  },

  componentDidMount: function() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 100, 100);
  },
});

var RegisterForDispatchesMixin = function(options) {
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

  render: function() {
    return (
      <div>
        Current tool: {this.state.status}
      </div>
    )
  },

  handleDispatches: function(payload) {
    if (payload.actionType == "status-update") {
      this.setState({status: payload.status});
    }
  }
});

var App = React.createClass({

  dispatchToken: String,
  dispatcher: Dispatcher,

  childContextTypes: {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  },

  getChildContext: function() {
    return {
      dispatcher: this.dispatcher
    }
  },

  componentWillMount: function() {
    this.dispatcher = appDispatcher;
  },

  render: function() {
    return (
      <div className="border flex">
        <ToolBar />
        <Canvas />
      </div>
    )
  }
});

ReactDOM.render(
  <App />, document.getElementById('react-container')
);