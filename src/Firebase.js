import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCo097ZDHJmN2Z7bBdAMXC2WRFujwQuTLc",
    authDomain: "messengerapp-13a83.firebaseapp.com",
    projectId: "messengerapp-13a83",
    storageBucket: "messengerapp-13a83.appspot.com",
    messagingSenderId: "274176929419",
    appId: "1:274176929419:web:90edf9e73758a0f11a2e8e"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db