/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');

var StatusBar = require('./statusBar.react');

var Canvas = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="p4">
        <h1 className="mt2">Canvas</h1>
        <canvas ref="canvas" className="border" />
        <StatusBar />
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

module.exports = Canvas;