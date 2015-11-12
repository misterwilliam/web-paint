/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');
var { Dispatcher } = require('flux');

var Canvas = require('./canvas.react');

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