import * as firebase from 'firebase';
const config = {
	apiKey: 'AIzaSyBlBaMvCkRvfTxPicUi40aZCeux2jByrMM',
	authDomain: 'react-chat-app-70785.firebaseapp.com',
	databaseURL: 'https://react-chat-app-70785.firebaseio.com',
	projectId: 'react-chat-app-70785',
	storageBucket: 'react-chat-app-70785.appspot.com',
	messagingSenderId: '417592457768'
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;
export const storage = firebase.storage();
