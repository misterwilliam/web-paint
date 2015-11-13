/* @flow */

var React = require('react');
var { Dispatcher } = require('flux');

var ToolBar = React.createClass({

  contextTypes: {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  },

  render: function(): ?ReactElement {
    return (
      <div className="p4 flex flex-column border">
        <h1 className="mt2">Toolbar</h1>
        <div id="paintbrush"
             className="mt2 btn btn-primary black bg-silver"
             onClick={this.handleClick} >
          Paintbrush
        </div>
        <div id="floodfill"
             className="mt2 btn black bg-silver"
             onClick={this.handleClick} >
          Floodfill
        </div>
      </div>
    )
  },

  handleClick: function(event: SyntheticEvent) {
    this.context.dispatcher.dispatch({
      actionType: "status-update",
      // $FlowIgnore: flow unable to infer that id is available on event.target
      status: event.target.id,
    })
  }
})

module.exports = ToolBar;