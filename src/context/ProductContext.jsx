import axios from 'axios';
import { backendUrl } from '../App';
import { createContext, useState, useEffect, useContext } from 'react';
import { TokenContext } from './TokenContext';
import { toast } from 'react-toastify';

export const ProductDataContext = createContext();

export const ProductDataProvider = ({ children }) => {
  const { token } = useContext(TokenContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');

  const [editedProduct, setEditedProduct] = useState({
    name: '',
    category: '',
    description: '',
    specs: [],
    price: '',
  });

  const bestseller = products.filter((item) => item.bestseller === true);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product');
      setProducts(response.data.products.reverse());
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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

    if (category && category !== 'all') {
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
        `${backendUrl}/api/product/${idToDelete}`,
        { headers: { 'token': token } }
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

  // ฟังก์ชั่นเพิ่มสินค้าขายดี
  const addToBestseller = async (idToAdd) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/${idToAdd}/bestseller`,
        { bestseller: true },
        { headers: { 'token': token } }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );

      setFilteredProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const updateProductInfo = async (idToUpdate) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/${idToUpdate}/updateproduct`,
        editedProduct,
        { headers: { 'token': token } }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
      console.log('Updated:', response.data);
      document.getElementById(`modal_edit_${idToUpdate}`).close();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  // ฟังก์ชั่นลบสินค้าขายดี
  const removeBestseller = async (idToAdd) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/${idToAdd}/bestseller`,
        { headers: { 'token': token } }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );

      setFilteredProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductDataContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        name,
        setName,
        category,
        setCategory,
        startDate,
        setStartDate,
        editedProduct,
        setEditedProduct,
        bestseller,
        filterProducts,
        resetFilters,
        handleDelete,
        addToBestseller,
        updateProductInfo,
        removeBestseller,
        fetchList,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};
