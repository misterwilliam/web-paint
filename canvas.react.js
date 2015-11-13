/* @flow */

var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var { Dispatcher } = require('flux');

var { PixelGrid, Point2D } = require('./pixelGrid.react');
var StatusBar = require('./statusBar.react');
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
                   onClick={this.handleClick} />
        <StatusBar status={this.state.status} />
      </div>
    )
  },

  handleClick: function(point: Point2D) {
    if (this.state.status == "paintbrush") {
      var value = this.refs.pixelGrid.grid.getPixel(point);
      if (value) {
        this.refs.pixelGrid.erasePixel(point);
      } else {
        this.refs.pixelGrid.drawPixel(point);
      }
    } else if (this.state.status == "floodfill") {
      this.refs.pixelGrid.floodFill(point);
    }
  },

  handleDispatches: function(payload: Object) {
    if (payload.actionType == "status-update") {
      this.setState({status: payload.status});
    }
  }

});

module.exports = Canvas;