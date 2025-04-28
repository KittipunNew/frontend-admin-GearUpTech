import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { logoutIcon } from '../assets/icon';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="bg-black w-80 p-10 flex flex-col justify-between items-end">
      <ul className="text-white text-xl text-end font-bold flex flex-col gap-10">
        <li>
          <img src={assets.logo} alt="" />
        </li>
        <li className="border-2 border-white"></li>
        <li>
          <Link to="/">List products</Link>
        </li>
        <li>
          <Link to="/addproducts">Add products</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
      <div className="w-full">
        <button
          className="btn btn-error text-white w-full"
          onClick={handleLogout}
        >
          {logoutIcon}Logout
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
