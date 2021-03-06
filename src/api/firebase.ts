import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = process.env.FIREBASE_CONFIG;

if (!config) {
  throw new Error('Firebase config missing.');
}

const firebaseConfig = !!firebase.apps[0]
  ? firebase.app()
  : firebase.initializeApp(config);

const db = firebaseConfig.firestore();
const auth = firebase.auth();

export { firebase, db, auth };
