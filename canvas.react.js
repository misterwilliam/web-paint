/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');

var StatusBar = require('./statusBar.react');

class Point2D {

  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var GetPoint2DFromCanvasClickEvent = function(event: SyntheticEvent) {
  var canvas = event.target;
  // $FlowIgnore
  var x = event.pageX - canvas.offsetLeft;
  // $FlowIgnore
  var y = event.pageY - canvas.offsetTop;
  return new Point2D(x, y);
}


var Canvas = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="p4">
        <h1 className="mt2">Canvas</h1>
        <canvas ref="canvas" className="border"
                onClick={this.handleClick} />
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

  handleClick: function(event: SyntheticEvent) {
    console.log(this.getClickLocation(event))
  },

  getClickLocation: function(event: SyntheticEvent): Point2D {
    return GetPoint2DFromCanvasClickEvent(event);
  }
});

module.exports = Canvas;