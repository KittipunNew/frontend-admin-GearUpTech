import axios from 'axios';
import { backendUrl } from '../App';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { icondelete } from './../assets/icondelete.jsx';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');

  const bestseller = products.filter((item) => item.bestseller === true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product');
        setProducts(response.data.products.reverse());
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };
    fetchList();
  }, [backendUrl]);

  // อัปเดต filteredProducts ทุกครั้งที่ products เปลี่ยนแปลง
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // ฟังก์ชันกรองสินค้า
  const filterProducts = () => {
    let filtered = products;

    if (name) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((p) => new Date(p.createdAt) >= start);
    }

    setFilteredProducts(filtered);
  };

  // ฟังก์ชันรีเซ็ตฟิลเตอร์
  const resetFilters = () => {
    setName('');
    setCategory('');
    setStartDate('');
    setFilteredProducts(products);
  };

  // ฟังก์ชันลบสินค้า
  const handleDelete = async (idToDelete) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/${idToDelete}`
      );

      if (response.status === 200) {
        const updatedProducts = products.filter(
          (item) => item._id !== idToDelete
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        toast.success('Data has been successfully deleted.');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        {/* search products */}
        <div className="bg-white p-10 rounded-xl shadow-lg flex flex-col gap-5 w-[80%]">
          <h1 className="font-bold text-2xl">Search Products</h1>
          <div className="flex gap-20">
            {/* product name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="productname">Product name</label>
              <input
                type="text"
                placeholder="Type here"
                className="input w-60"
                id="productname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* product category */}
            <div className="flex flex-col gap-2">
              <label>Product category</label>
              <select
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>PC</option>
                <option>Notebook</option>
                <option>Monitor</option>
                <option>Accessorie</option>
                <option>Chair</option>
                <option>Network</option>
              </select>
            </div>
            {/* Date & Time */}
            <div className="flex flex-col gap-2">
              <label>Date & Time</label>
              <input
                type="date"
                className="input w-40"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-5 mt-5">
            <button
              className="btn btn-wide btn-primary"
              onClick={filterProducts}
            >
              Search
            </button>
            <button className="btn btn-wide" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-10 rounded-xl shadow-lg w-[20%] flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl">Total Products</h1>
          <h1 className="font-bold text-4xl">
            {products.length.toLocaleString()}
          </h1>
        </div>
      </div>

      {/* แสดงรายการสินค้า */}
      <div className="flex flex-col gap-5 bg-white p-10 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">List products</h1>
          <h1 className="font-bold text-2xl">
            Quantity : {filteredProducts.length.toLocaleString()}
          </h1>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-fixed w-full">
            <thead className="sticky top-0 bg-base-100 z-10">
              <tr className="text-xl">
                <th className="w-60"></th>
                <th className="w-2/3">Name</th>
                <th className="w-1/3">Category</th>
                <th className="w-1/3">Price</th>
                <th className="w-1/3"></th>
              </tr>
            </thead>
          </table>
          <div className="max-h-96 overflow-y-auto">
            <table className="table table-fixed w-full">
              <tbody>
                {filteredProducts.map((item, index) => (
                  <tr key={index} className="text-lg">
                    <th className="w-60">
                      <img src={item.images[0]} alt="" className="w-20" />
                    </th>
                    <td className="w-2/3">{item.name}</td>
                    <td className="w-1/3">{item.category}</td>
                    <td className="w-1/3">{item.price.toLocaleString()}</td>
                    <td className="w-1/3">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        {icondelete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h1
              className={`justify-center items-center h-20 text-xl font-bold ${
                filteredProducts.length === 0 ? 'flex' : 'hidden'
              }`}
            >
              No data found !!!
            </h1>
          </div>
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex flex-col gap-5 bg-white p-10 rounded-xl shadow-lg">
        <h1 className="font-bold text-2xl">Bestseller</h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-fixed w-full">
            <thead className="sticky top-0 bg-base-100 z-10">
              <tr className="text-xl">
                <th className="w-60"></th>
                <th className="w-1/3">Name</th>
                <th className="w-1/3">Category</th>
                <th className="w-1/3">Price</th>
              </tr>
            </thead>
          </table>
          <div className="max-h-96 overflow-y-auto">
            <table className="table table-fixed w-full">
              <tbody>
                {bestseller.map((item, index) => (
                  <tr key={index} className="text-lg">
                    <th className="w-60">
                      <img src={item.images[0]} alt="" className="w-20" />
                    </th>
                    <td className="w-1/3">{item.name}</td>
                    <td className="w-1/3">{item.category}</td>
                    <td className="w-1/3">{item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
