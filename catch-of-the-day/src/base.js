import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBVys6Z0EqgrwVPn4OCsM490Eboo5VR70k',
	authDomain: 'catch-of-the-day-f6c08.firebaseapp.com',
	databaseURL: 'https://catch-of-the-day-f6c08.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
