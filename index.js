/* @flow */

var React = require('react');
var ReactDOM = require('react-dom');

// Demonstrate usage of es2015 feature with a flow feature.
class ExampleClass {
  data: string;
  constructor() {
    this.data = "data";
  }
}
var exampleClass = new ExampleClass();

var Foo = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.message}
      </div>
    )
  }
});

ReactDOM.render(
  <Foo message={exampleClass.data} />,
  document.getElementById('react-container')
);