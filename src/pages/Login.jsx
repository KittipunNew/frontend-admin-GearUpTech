import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductDataContext } from '../context/ProductContext';
import { TokenContext } from '../context/TokenContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', {
        username,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black relative">
      <div className="absolute top-8 left-8">
        <img src={assets.logo} alt="Logo" className="w-full h-16" />
      </div>

      <div className="rounded-2xl shadow-[0_0_80px_rgba(101,163,13,1.0)] flex flex-col gap-5 p-20 bg-lime-500 text-white">
        <h1 className="text-5xl font-bold">Admin Login</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input text-black border-none"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
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
            />
          </div>
          <button className="btn btn-neutral">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
