/**
 * @jsx React.DOM
 */


var React = require('react/addons');

var Mark = React.createClass({
	render: function(){
		return(
		<p>{this.props.mark}</p>
	)}
});

module.exports = Mark;
