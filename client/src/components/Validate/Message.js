import React from 'react';

export default class ValidateMessageComponent extends React.Component{
	render(){
		return (
			<p className="text-danger">{this.props.message}</p>
		)
	}
}