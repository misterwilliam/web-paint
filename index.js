/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');
var { Dispatcher } = require('flux');
// Globally load basscss into this project
// $FlowIgnore: Flow can't find this module
var basscss = require('basscss/css/basscss.css');

var Canvas = require('./canvas.react');
var ToolBar = require('./toolBar.react');

var appDispatcher = new Dispatcher();


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