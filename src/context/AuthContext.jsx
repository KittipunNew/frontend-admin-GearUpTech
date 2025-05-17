import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getIdToken, getAuth } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // เก็บข้อมูลของผู้ใช้ที่ล็อกอิน
  const [users, setUsers] = useState([]); // เก็บข้อมูลผู้ใช้ทั้งหมดใน Firestore (เฉพาะ role: admin ที่ดูได้)
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลผู้ใช้ทั้งหมด
  useEffect(() => {
    const fetchAllUsers = async () => {
      const usersCollection = collection(db, 'user_admin'); // เข้าถึง collection 'users'
      const usersSnapshot = await getDocs(usersCollection); // ดึงข้อมูลทั้งหมดจาก Firestore
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersList);
      setLoading(false);
    };

    fetchAllUsers();
  }, []);

  // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'user_admin', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData({ uid: user.uid, ...userSnap.data() });
        } else {
          console.log('No such document!');
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const getToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await getIdToken(user);
      return token;
    } else {
      throw new Error('No user is signed in');
    }
  };

  return (
    <AuthContext.Provider value={{ userData, users, getToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
