import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InputFile from './InputFile';
import AuthButton from '../components/AuthButton';
import { changeFile, closeFile } from '../actions/changeFile';
import { uploadPhoto, deleteUser } from '../actions/changeUserData';

class UserCard extends Component {
	fileChange = e => {
		const file = e.target.files[0];
		this.props.changeFile(file);
	};
	uploadPhoto = () => {
		this.props.uploadPhoto(this.props.file);
	};
	deleteUser = () => {
		const result = window.confirm('Do you really want to remove profile?');
		if (result) {
			this.props.deleteUser();
		}
	};

	render() {
		const { authUser, fileName, closeFile, inProcess } = this.props;
		return (
			<React.Fragment>
				<div className="user-info__card">
					<div className="card-headline">
						<h2 className="ui-text-headline">BASIC INFO</h2>
					</div>
					<div className="card-wrapper">
						<div className="card__avatar">
							<div className="card__avatar-wrapper">
								{authUser.avatar ? (
									<img
										src={authUser.avatar}
										alt="User avatar"
									/>
								) : (
									<i className="far fa-user-circle fa-10x" />
								)}
							</div>
							<div className="file_upload">
								<label>
									<i className="fas fa-camera fa-2x" />
									<input
										className="input-file"
										id="user_photo"
										type="file"
										accept=".jpg, .jpeg, .png"
										onChange={this.fileChange}
									/>
								</label>
								{fileName ? (
									<InputFile
										fileName={fileName}
										close={() => closeFile()}
									/>
								) : null}
							</div>
						</div>
						<div className="card__data">
							<div className="data__field">
								<h3 className="ui-text-subhead">Name</h3>
								<p className="ui-text-subhead">
									{authUser.name}
								</p>
							</div>
							<div className="data__field">
								<h3 className="ui-text-subhead">Email</h3>
								<p className="ui-text-subhead">
									{authUser.email}
								</p>
							</div>
							<div className="data__field">
								<h3 className="ui-text-subhead">Uid</h3>
								<p className="ui-text-subhead">
									{authUser.currentUid}
								</p>
							</div>
							<div className="data__field">
								<h3 className="ui-text-subhead">Created at</h3>
								<p className="ui-text-subhead">
									{authUser.createAt}
								</p>
							</div>
						</div>
					</div>
					<div className="user-info__actions ui-card__actions">
						<AuthButton
							onClick={this.uploadPhoto}
							className="ui-button_raised"
							buttonName="CHANGE PHOTO"
							inProcess={inProcess}
						/>
						<AuthButton
							onClick={this.deleteUser}
							className="ui-button_flat"
							buttonName="DELETE USER"
							inProcess={inProcess}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	authUser: state.authUser,
	inProcess: state.authUser.inProcess,
	file: state.changeFile.file,
	fileName: state.changeFile.fileName,
});

const matDispatchToProps = dispatch => {
	return {
		uploadPhoto: file => dispatch(uploadPhoto(file)),
		deleteUser: history => dispatch(deleteUser(history)),
		changeFile: file => dispatch(changeFile(file)),
		closeFile: () => dispatch(closeFile()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		matDispatchToProps
	)(UserCard)
);

UserCard.propTypes = {
	authUser: PropTypes.object,
	uploadPhoto: PropTypes.func,
	deleteUser: PropTypes.func,
	changeFile: PropTypes.func,
	closeFile: PropTypes.func,
	fileName: PropTypes.string,
	inProcess: PropTypes.bool,
};
