import React from 'react';
var classNames = require('classnames');

export default class AlertComponent extends React.Component {
	render() {
		let className = classNames({
	      	'alert': true,
	      	'alert-success': this.props.type == 'success' ? true : false,
	      	'alert-danger': this.props.type =='danger' ? true : false,
	      	'alert-styled-left': true,
	      	'alert-arrow-left': true,
	      	'alert-bordered':true
	    });
		return (
			<div className={className}>
				<button type="button" className="close" data-dismiss="alert"><span>×</span><span className="sr-only">Close</span></button>
				<b className="text-semibold">{this.props.message}</b> {this.props.description}
		    </div>
		);
	}
}