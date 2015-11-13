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
  return CanvasCoordToPixelGridCoord(new Point2D(x, y));
}

var CanvasCoordToPixelGridCoord = function(canvasPoint: Point2D): Point2D {
  var x = Math.floor(canvasPoint.x / 10);
  var y = Math.floor(canvasPoint.y / 10);
  return new Point2D(x, y);
}

var PixelGridCoordToCanvasCoord = function(canvasPoint: Point2D): Point2D {
  var x = canvasPoint.x * 10;
  var y = canvasPoint.y * 10;
  return new Point2D(x, y);
}

var PixelGrid = React.createClass({

  ctx: CanvasRenderingContext2D,

  componentDidMount: function() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "green";
  },

  render: function(): ?ReactElement {
    return (
      <canvas ref="canvas" className="border" onClick={this.handleClick} />
    )
  },

  drawPixel: function(point) {
    var canvasPoint = PixelGridCoordToCanvasCoord(point);
    this.ctx.fillRect(canvasPoint.x, canvasPoint.y, 10, 10);
  },

  handleClick: function(event: SyntheticEvent) {
    this.drawPixel(this.getClickLocation(event));
  },

  getClickLocation: function(event: SyntheticEvent): Point2D {
    return GetPoint2DFromCanvasClickEvent(event);
  }
})


var Canvas = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="p4">
        <h1 className="mt2">Canvas</h1>
        <PixelGrid />
        <StatusBar />
      </div>
    )
  },


});

module.exports = Canvas;