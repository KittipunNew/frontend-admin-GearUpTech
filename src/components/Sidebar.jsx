import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="bg-black w-80 p-10">
      <ul className="text-white text-xl text-end font-bold flex flex-col gap-10">
        <li>
          <img src={assets.logo} alt="" />
        </li>
        <li className="border-2 border-white"></li>
        <li>
          <Link to="/addproducts">Add products</Link>
        </li>
        <li>
          <Link to="/listproducts">List products</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
