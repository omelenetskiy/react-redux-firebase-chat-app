import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../../components/InputField';
import { isOpen } from '../../actions/isOpen';
import { addChannel } from '../../actions/addChannel';
import './createChannel.sass';

class CreateChannel extends Component {
	state = {
		name: ''
	};
	onChange = e => {
		const value = e.target.value;
		this.setState({ name: value });
	};
	createChannel = name => {
		if (name) {
			this.props.addChannel(name);
			this.setState({ name: '' });
			this.props.isOpen(false);
		}
	};

	render() {
		const { name } = this.state;
		const { isOpen } = this.props;
		return (
			<div className="ui-popup">
				<div className="ui-card">
					<div className="ui-card__title">
						<h2 className="ui-text-title">Create new room</h2>
					</div>
					<div className="ui-card__content">
						<InputField
							value={name}
							type="text"
							name="name"
							text="Channel name"
							onChange={this.onChange}
						/>
					</div>
					<div className="ui-card__actions">
						<button
							className="ui-button ui-button_raised"
							onClick={() => this.createChannel(name)}
						>
							Create
						</button>
						<button
							className="ui-button ui-button_flat"
							onClick={() => isOpen(false)}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		isOpen: open => dispatch(isOpen(open)),
		addChannel: name => dispatch(addChannel(name))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(CreateChannel);

CreateChannel.propTypes = {
	isOpen: PropTypes.func,
	addChannel: PropTypes.func
};
