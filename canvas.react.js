/* @flow */

var _ = require('underscore');
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

class Grid {

  width: number;
  height: number;
  data: Array<Array<bool>>;

  constructor() { }

  init(width, height) {
    this.width = width;
    this.height = height;

    this.data = [];
    for (var i=0; i < height; i++) {
      this.data[i] = [];
    }
  }

  getPixel(point): bool {
    var value = this.data[point.x][point.y];
    if (value == true) {
      return true;
    } else {
      return false;
    }
  }

  setPixel(point, value) {
    this.data[point.x][point.y] = value;
  }

  isPointWithinBounds(point) {
    if ((point.x >= 0 && point.x < this.width) &&
         (point.x >= 0 && point.x < this.height)) {
      return true;
    } else {
      return false;
    }
  }

  getSameColorConnectedPoints(startPoint): Array<Point2D> {
    // Init data
    var todo = [];
    todo.push(startPoint);
    var seen = [];
    seen.push(startPoint);
    var sameColorPoints = [];
    var startColor = this.getPixel(startPoint);
    // Run BFS
    while (todo.length > 0) {
      var currentPoint = todo.pop();
      if (this.getPixel(currentPoint) == startColor) {
        sameColorPoints.push(currentPoint);
        for (var i=0; i < 2; i++) {
          for (var j=0; j < 2; j++) {
            if !(i == 0 && j == 0) {
              var newPoint = new Point(startPoint.x + i, startPoint.y + j);
              if (this.isPointWithinBounds(newPoint)) {
                seen.push(newPoint);
                todo.push(newPoint);
              }
            }
          }
        }
      }
    }
    return sameColorPoints;
  }
}


var PixelGrid = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  grid: new Grid(),

  componentDidMount: function() {
    this.grid.init(this.props.width, this.props.height);
    this.getCanvasContext().fillStyle = "green";
  },

  render: function(): ?ReactElement {
    return (
      <canvas ref="canvas" className="border" onClick={this.handleClick}
              width={this.props.width * 10}
              height={this.props.height * 10} />
    )
  },

  drawPixel: function(point) {
    this.grid.setPixel(point, true);
    var canvasPoint = PixelGridCoordToCanvasCoord(point);
    this.getCanvasContext().fillRect(canvasPoint.x, canvasPoint.y, 10, 10);
  },

  erasePixel: function(point) {
    this.grid.setPixel(point, false);
    var canvasPoint = PixelGridCoordToCanvasCoord(point);
    this.getCanvasContext().clearRect(canvasPoint.x, canvasPoint.y, 10, 10);
  },

  floodFill: function(point) {
    var startColor = this.grid.getPixel(point);
    var floodPath = this.grid.getSameColorConnectedPoints(point);
    _.each(floodPath, (point) => {
      this.gird.setPixel(!startColor);
    })
  },

  handleClick: function(event: SyntheticEvent) {
    var point = this.getClickLocation(event);
    var value = this.grid.getPixel(point);
    if (value) {
      this.erasePixel(point);
    } else {
      this.drawPixel(point);
    }
  },

  getClickLocation: function(event: SyntheticEvent): Point2D {
    return GetPoint2DFromCanvasClickEvent(event);
  },

  getCanvasContext: function() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    return canvas.getContext("2d");
  }
})


var Canvas = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div className="p4">
        <h1 className="mt2">Canvas</h1>
        <PixelGrid width={50} height={50} />
        <StatusBar />
      </div>
    )
  },


});

module.exports = Canvas;