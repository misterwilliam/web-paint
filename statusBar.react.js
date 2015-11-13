/* @flow */

var React = require('react');

var StatusBar = React.createClass({
  render: function(): ?ReactElement {
    return (
      <div>
        Current tool: {this.props.status}
      </div>
    )
  },
});

module.exports = StatusBar;