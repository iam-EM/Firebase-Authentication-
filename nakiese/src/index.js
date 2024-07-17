
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa1Vym5RgcUqhLUreRh-bwQDnejROgEa8",
  authDomain: "nakiesetest.firebaseapp.com",
  projectId: "nakiesetest",
  storageBucket: "nakiesetest.appspot.com",
  messagingSenderId: "142491662773",
  appId: "1:142491662773:web:aa1266b83607f812c881fc",
  measurementId: "G-KR8NJMXRSQ"
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