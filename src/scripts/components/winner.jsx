/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Winner = React.createClass({
	render: function(){
		return(
			<h3>{this.props.winner + " won"}</h3>
		);
	}
})

module.exports = Winner;
