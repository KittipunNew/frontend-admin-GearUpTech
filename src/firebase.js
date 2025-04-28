import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbh1aIxpt4ckwSyBcmz-O-3yUylUfdjE4',
  authDomain: 'gearuptech-appcheck-84e1f.firebaseapp.com',
  projectId: 'gearuptech-appcheck-84e1f',
  storageBucket: 'gearuptech-appcheck-84e1f.firebasestorage.app',
  messagingSenderId: '983755077753',
  appId: '1:983755077753:web:a417728910219545013ca8',
  measurementId: 'G-4B2QNGYCVD',
};

const app = initializeApp(firebaseConfig); // เชื่อมต่อ Firebase

const auth = getAuth(app); // เอาไว้ทำเรื่องเกี่ยวกับ "ล็อกอิน / ล็อกเอาต์ / สมัครสมาชิก"
const db = getFirestore(app); //  เอาไว้จัดการข้อมูลในฐานข้อมูล Firestore

export { auth, signInWithEmailAndPassword, db };
