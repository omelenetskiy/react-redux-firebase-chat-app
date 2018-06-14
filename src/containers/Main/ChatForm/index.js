import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendChatMsg } from '../../../actions/sendMsg';
import InputFile from '../../../components/InputFile';
import Progress from '../../../components/Progress';
import { changeFile, closeFile } from '../../../actions/changeFile';
import './form.sass';

class ChatForm extends Component {
	state = {
		msg: ''
	};

	onChange = e => {
		this.setState({
			msg: e.target.value
		});
	};

	fileChange = e => {
		const file = e.target.files[0];
		this.props.changeFile(file);
	};

	privateMsg = (sender, msg, e) => {
		e.preventDefault();
		const { file } = this.props;
		const receiver = this.props.match.params.id;
		if (file || msg !== '') {
			this.props.sendChatMsg(sender, receiver, msg, file);
			this.setState({ msg: '' });
		} else {
			return false;
		}
	};
	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			this.props.closeFile();
		}
	}
	render() {
		const { msg } = this.state;
		const { sender, progress, fileName, closeFile } = this.props;
		return (
			<div className="chat__main__form">
				{progress > 0 && progress < 100 ? (
					<Progress progress={progress} />
				) : null}
				<div className="input__form">
					<form onSubmit={() => this.privateMsg(sender, msg.trim())}>
						<label>
							<i className="far fa-image fa-2x" />
							<input
								type="file"
								name="file"
								id="msg-file"
								accept=".jpg, .jpeg, .png"
								onChange={this.fileChange}
							/>
						</label>
						<input
							type="text"
							placeholder="Write message..."
							onChange={this.onChange}
							value={msg}
						/>
						<button
							className="ui-button ui-button_icon"
							onClick={e =>
								this.privateMsg(sender, msg.trim(), e)
							}
						>
							<i className="fab fa-3x fa-google-play" />
						</button>
					</form>
				</div>
				{fileName ? (
					<InputFile fileName={fileName} close={() => closeFile()} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sender: state.authUser.currentUid,
	progress: state.progress.value,
	file: state.changeFile.file,
	fileName: state.changeFile.fileName
});

const mapDispatchToProps = dispatch => {
	return {
		sendChatMsg: (sender, receiver, msg, file) =>
			dispatch(sendChatMsg(sender, receiver, msg, file)),
		changeFile: file => dispatch(changeFile(file)),
		closeFile: () => dispatch(closeFile())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChatForm)
);

ChatForm.propTypes = {
	sendChatMsg: PropTypes.func,
	changeFile: PropTypes.func,
	closeFile: PropTypes.func,
	sender: PropTypes.string,
	progress: PropTypes.number,
	file: PropTypes.object,
	fileName: PropTypes.string
};
