import firebase from './firebase'

// Sign Up
export const signUp = (email: string, password: string) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
};