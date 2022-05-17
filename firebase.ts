// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCi_GKPZe6vJclbdxNuJtmmvsxG7e6cR8g',
	authDomain: 'zeeflix-2d564.firebaseapp.com',
	projectId: 'zeeflix-2d564',
	storageBucket: 'zeeflix-2d564.appspot.com',
	messagingSenderId: '359378002432',
	appId: '1:359378002432:web:6549a610dbc4043177eee5',
	databaseURL: 'https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }