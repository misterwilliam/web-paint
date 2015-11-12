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
        <canvas ref="canvas"/>
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

var StatusBar = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.status}
      </div>
    )
  }
});

var App = React.createClass({

  dispatchToken: String,
  dispatcher: Dispatcher,

  childContextTypes: {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  },

  getChildContext: function() {
    return {dispatcher: this.dispatcher}
  },

  getInitialState: function() {
    return {
      status: "",
    }
  },

  componentWillMount: function() {
    this.dispatcher = appDispatcher;
    this._registerForDispatches(this.dispatcher);
  },

  render: function() {
    return (
      <div className="border flex">
        <ToolBar />
        <StatusBar status={this.state.status} />
        <Canvas />
      </div>
    )
  },

  _handleDispatches: function(payload) {
    if (payload.actionType == "status-update") {
      this.setState({status: payload.status});
    }
  },

  _registerForDispatches: function(dispatcher) {
    this.dispatchToken = dispatcher.register(this._handleDispatches);
  },

  _unregisterForDispatches: function(dispatcher) {
    dispatcher.unregister(this.dispatchToken);
  }


});

ReactDOM.render(
  <App />, document.getElementById('react-container')
);