/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');
var { Dispatcher } = require('flux');

var { PixelGrid, Point2D } = require('./pixelGrid.react');
var { RegisterForDispatchesMixin } = require('./utils');


var Canvas = React.createClass({

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
      <div className="p4">
        <h1 className="mt2">Canvas</h1>
        <PixelGrid ref="pixelGrid"
                   width={50} height={50}
                   onClick={this.handleClick}
                   onDrag={this.handleDrag} />
      </div>
    )
  },

  handleClick: function(point: Point2D) {
    if (this.state.status == "paintbrush") {
      this.refs.pixelGrid.drawPixel(point);
    } else if (this.state.status == "eraser") {
      this.refs.pixelGrid.erasePixel(point);
    } else if (this.state.status == "floodfill") {
      this.refs.pixelGrid.floodFill(point);
    }
  },

  handleDrag: function(point: Point2D) {
    if (this.state.status == "paintbrush") {
      this.refs.pixelGrid.drawPixel(point);
    } else if (this.state.status == "eraser") {
      this.refs.pixelGrid.erasePixel(point);
    }
  },

  handleDispatches: function(payload: Object) {
    if (payload.actionType == "status-update") {
      this.setState({status: payload.status});
    }
  },
});

module.exports = Canvas;