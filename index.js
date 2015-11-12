/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');

var ToolBar = React.createClass({
  render: function() {
    return (
      <div>
        Toolbar
        <div className="button">
          Paintbrush
        </div>
        <div className="button">
          Rectangle
        </div>
        <div className="button">
          Floodfill
        </div>
      </div>
    )
  }
})

var Canvas = React.createClass({
  render: function() {
    return (
      <div>
        Canvas
      </div>
    )
  }
})

var App = React.createClass({
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