import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ดึงข้อมูล user ตรง ๆ จาก firestore
      const userDocRef = doc(db, 'user_admin', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const freshUserData = userDocSnap.data();

        if (freshUserData.role === 'admin') {
          navigate('/');
        } else {
          toast.error('You do not have permission to access this page.');
        }
      } else {
        toast.error('User data not found.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error(`Login failed`);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black relative">
      <div className="absolute top-8 left-8">
        <img src={assets.logo} alt="Logo" className="w-full h-16" />
      </div>

      <div className="rounded-2xl shadow-[0_0_80px_rgba(101,163,13,1.0)] flex flex-col gap-5 p-20 bg-lime-500 text-white">
        <h1 className="text-5xl font-bold">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="email"
              className="input text-black border-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input text-black border-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="btn btn-neutral">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
