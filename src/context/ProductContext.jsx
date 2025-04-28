import axios from 'axios';
import { backendUrl } from '../App';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getIdToken } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';

export const ProductDataContext = createContext();

export const ProductDataProvider = ({ children }) => {
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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const resetFilters = () => {
    setName('');
    setCategory('');
    setStartDate('');
    setFilteredProducts(products);
  };

  const handleDelete = async (idToDelete) => {
    try {
      const token = await getToken();
      const response = await axios.delete(
        `${backendUrl}/api/product/${idToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const addToBestseller = async (idToAdd) => {
    try {
      const token = await getToken();
      const response = await axios.put(
        `${backendUrl}/api/product/${idToAdd}/bestseller`,
        { bestseller: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      toast.error(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const updateProductInfo = async (idToUpdate) => {
    try {
      const token = await getToken();
      const response = await axios.put(
        `${backendUrl}/api/product/${idToUpdate}/updateproduct`,
        editedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const removeBestseller = async (idToRemove) => {
    try {
      const token = await getToken();
      const response = await axios.delete(
        `${backendUrl}/api/product/${idToRemove}/bestseller`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
