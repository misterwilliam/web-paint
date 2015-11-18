/* @flow */

var classnames = require('classnames');
var React = require('react');
var { Dispatcher } = require('flux');

var ToolBar = React.createClass({

  contextTypes: {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  },

  getInitialState: function() {
    return {
      currentTool: "paintbrush"
    }
  },

  render: function(): ?ReactElement {
    return (
      <div className="p4 flex flex-column border">
        <h1 className="mt2">Toolbar</h1>
        <div id="paintbrush"
             className={classnames("mt2", "btn", "btn-primary", "black",
                                   {"bg-silver": this.state.currentTool != "paintbrush",
                                    "bg-yellow": this.state.currentTool == "paintbrush"})}
             onClick={this.handleClick} >
          Paintbrush
        </div>
        <div id="eraser"
             className={classnames("mt2", "btn", "btn-primary", "black",
                                   {"bg-silver": this.state.currentTool != "eraser",
                                    "bg-yellow": this.state.currentTool == "eraser"})}
             onClick={this.handleClick} >
          Eraser
        </div>
        <div id="floodfill"
             className={classnames("mt2", "btn", "btn-primary", "black",
                                   {"bg-silver": this.state.currentTool != "floodfill",
                                    "bg-yellow": this.state.currentTool == "floodfill"})}
             onClick={this.handleClick} >
          Floodfill
        </div>
      </div>
    )
  },

  componentDidMount: function() {
    // Happens after first full render of page
    this.context.dispatcher.dispatch({
      actionType: "status-update",
      status: this.state.currentTool
    })
  },

  handleClick: function(event: SyntheticEvent) {
    // $FlowIgnore: flow unable to infer that id is available on event.target
    var currentTool = event.target.id;
    this.context.dispatcher.dispatch({
      actionType: "status-update",
      status: currentTool
    })
    this.setState({currentTool: currentTool});
  }
})

module.exports = ToolBar;