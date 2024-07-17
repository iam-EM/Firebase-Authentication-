
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()



const colRef = collection(db, 'heroes')

getDocs(colRef)
  .then((snapshot) => {
      let heroes = []
      snapshot.docs.forEach((doc) => {
          heroes.push({ ...doc.data(), id: doc.id })
      })
      console.log(heroes)
  })
  .catch(error => {
      console.log(error.message)
  })

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
e.preventDefault()

const name = signupForm.name.value
const surname = signupForm.surname.value
const email = signupForm.email.value
const password = signupForm.password.value

createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log('user created:', cred.user)

    signupForm.reset()
  })
  .catch((err)=> {
    console.log(err.message)
  })
})
