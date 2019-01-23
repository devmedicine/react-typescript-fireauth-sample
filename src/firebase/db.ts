import firebase from "./firebase";
import 'firebase/firestore';

/* ユーザ情報 */
interface User {
  uid: string,
  name: string,
  email: string
}

/* ユーザ情報の更新 */
export const updateUser = (user: User) => {
  firebase.firestore().collection('users').doc(user.uid).set({
    username: user.name,
    email: user.email
  });
};