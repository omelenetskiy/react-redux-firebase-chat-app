import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InputFile from './InputFile';
import AuthButton from './AuthButton';
import { changeFile, closeFile } from '../actions/changeFile';
import { uploadPhoto, deleteUser } from '../actions/changeUserData';

class UserCard extends Component {
  fileChange = (e) => {
    const { chgFile } = this.props;
    const file = e.target.files[0];
    chgFile(file);
  };

  uploadPhoto = () => {
    const { uplPhoto, file } = this.props;
    uplPhoto(file);
  };

  deleteUser = () => {
    const { dltUser } = this.props;
    const result = window.confirm('Do you really want to remove profile?');
    if (result) {
      dltUser();
    }
  };

  render() {
    const {
      authUser, fileName, clsFile, inProcess,
    } = this.props;
    return (
      <React.Fragment>
        <div className="user-info__card">
          <div className="card-headline">
            <h2 className="ui-text-headline">
BASIC INFO
            </h2>
          </div>
          <div className="card-wrapper">
            <div className="card__avatar">
              <div className="card__avatar-wrapper">
                {authUser.avatar ? (
                  <img src={authUser.avatar} alt="User avatar" />
                ) : (
                  <i className="far fa-user-circle fa-10x" />
                )}
              </div>
              <div className="file_upload">
                <label title="choose image">
                  <i className="fas fa-camera fa-2x" />
                  <input
                    className="input-file"
                    id="user_photo"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.fileChange}
                  />
                </label>
                {fileName ? <InputFile fileName={fileName} close={() => clsFile()} /> : null}
              </div>
            </div>
            <div className="card__data">
              <div className="data__field">
                <h3 className="ui-text-subhead">
Name
                </h3>
                <p className="ui-text-subhead">
                  {authUser.name}
                </p>
              </div>
              <div className="data__field">
                <h3 className="ui-text-subhead">
Email
                </h3>
                <p className="ui-text-subhead">
                  {authUser.email}
                </p>
              </div>
              <div className="data__field">
                <h3 className="ui-text-subhead">
Uid
                </h3>
                <p className="ui-text-subhead">
                  {authUser.currentUid}
                </p>
              </div>
              <div className="data__field">
                <h3 className="ui-text-subhead">
Created at
                </h3>
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

const matDispatchToProps = dispatch => ({
  uplPhoto: file => dispatch(uploadPhoto(file)),
  dltUser: history => dispatch(deleteUser(history)),
  chgFile: file => dispatch(changeFile(file)),
  clsFile: () => dispatch(closeFile()),
});

export default withRouter(
  connect(
    mapStateToProps,
    matDispatchToProps,
  )(UserCard),
);

UserCard.defaultProps = {
  fileName: '',
  inProcess: false,
  file: '',
  authUser: null,
};

UserCard.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    createAt: PropTypes.string,
    currentUid: PropTypes.string,
  }),
  uplPhoto: PropTypes.func.isRequired,
  dltUser: PropTypes.func.isRequired,
  chgFile: PropTypes.func.isRequired,
  clsFile: PropTypes.func.isRequired,
  fileName: PropTypes.string,
  inProcess: PropTypes.bool,
  file: PropTypes.string,
};
