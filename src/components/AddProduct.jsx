import { useContext, useState } from 'react';
import { assets } from './../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { ProductDataContext } from '../context/ProductContext';
import { getAuth } from 'firebase/auth';
import { getIdToken } from 'firebase/auth';

const AddProduct = () => {
  const { fetchList } = useContext(ProductDataContext);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('specs', specs.trim());
      formData.append('price', price);
      formData.append('category', category);
      formData.append('bestseller', bestseller);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const token = await getToken();
      const response = await axios.post(backendUrl + '/api/product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
        setName('');
        setDescription('');
        setSpecs('');
        setPrice('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-10 p-10 bg-white rounded-xl shadow-lg"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-xl">Upload Image</h1>
        <div className="flex gap-5">
          <div className="relative">
            <button
              className={`badge badge-error rounded-full absolute -top-3 -right-3 font-bold text-white ${
                !image1 ? 'hidden' : 'block'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (image1) URL.revokeObjectURL(image1);
                setImage1(null);
                // Reset input file
                document.getElementById('image1').value = null;
              }}
              type="button"
            >
              X
            </button>
            <label htmlFor="image1">
              <img
                src={!image1 ? assets.upload : URL.createObjectURL(image1)}
                alt=""
                className={`border-2 border-gray-400 w-20 p-3 ${
                  image1 ? 'border-solid w-40' : 'border-dashed'
                }`}
              />
              <input
                onChange={(e) => {
                  if (image1) URL.revokeObjectURL(image1);
                  setImage1(e.target.files[0]);
                }}
                type="file"
                id="image1"
                hidden
              />
            </label>
          </div>
          <div className="relative">
            <button
              className={`badge badge-error rounded-full absolute -top-3 -right-3 font-bold text-white ${
                !image2 ? 'hidden' : 'block'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (image2) URL.revokeObjectURL(image2);
                setImage2(null);
                document.getElementById('image2').value = null;
              }}
              type="button"
            >
              X
            </button>
            <label htmlFor="image2">
              <img
                src={!image2 ? assets.upload : URL.createObjectURL(image2)}
                alt=""
                className={`border-2 border-gray-400 w-20 p-3 ${
                  image2 ? 'border-solid w-40' : 'border-dashed'
                }`}
              />
              <input
                onChange={(e) => {
                  if (image2) URL.revokeObjectURL(image2);
                  setImage2(e.target.files[0]);
                }}
                type="file"
                id="image2"
                hidden
              />
            </label>
          </div>
          <div className="relative">
            <button
              className={`badge badge-error rounded-full absolute -top-3 -right-3 font-bold text-white ${
                !image3 ? 'hidden' : 'block'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (image3) URL.revokeObjectURL(image3);
                setImage3(null);
                document.getElementById('image3').value = null;
              }}
              type="button"
            >
              X
            </button>
            <label htmlFor="image3">
              <img
                src={!image3 ? assets.upload : URL.createObjectURL(image3)}
                alt=""
                className={`border-2 border-gray-400 w-20 p-3 ${
                  image3 ? 'border-solid w-40' : 'border-dashed'
                }`}
              />
              <input
                onChange={(e) => {
                  if (image3) URL.revokeObjectURL(image3);
                  setImage3(e.target.files[0]);
                }}
                type="file"
                id="image3"
                hidden
              />
            </label>
          </div>
          <div className="relative">
            <button
              className={`badge badge-error rounded-full absolute -top-3 -right-3 font-bold text-white ${
                !image4 ? 'hidden' : 'block'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (image4) URL.revokeObjectURL(image4);
                setImage4(null);
                document.getElementById('image4').value = null;
              }}
              type="button"
            >
              X
            </button>
            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload : URL.createObjectURL(image4)}
                alt=""
                className={`border-2 border-gray-400 w-20 p-3 ${
                  image4 ? 'border-solid w-40' : 'border-dashed'
                }`}
              />
              <input
                onChange={(e) => {
                  if (image4) URL.revokeObjectURL(image4);
                  setImage4(e.target.files[0]);
                }}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Product name</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Product description</h1>
        <textarea
          className="textarea"
          placeholder="Write content here"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="specInput" className="font-bold text-xl">
          Technical specifications{' '}
          <span className="text-sm text-red-500">
            (***Please enter each specification on a new line.***)
          </span>
        </label>
        <textarea
          className="textarea"
          placeholder={`e.g. CPU: Intel Core i7-14700`}
          onChange={(e) => setSpecs(e.target.value)}
          value={specs}
        ></textarea>
      </div>

      <div className="flex items-center gap-10 ">
        <div>
          <h1 className="font-bold text-xl mb-3">Product category</h1>
          <select
            defaultValue="category"
            className="select"
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
          >
            <option disabled={true}>category</option>
            <option>PC</option>
            <option>Notebook</option>
            <option>Monitor</option>
            <option>Accessorie</option>
            <option>Chair</option>
            <option>Network</option>
          </select>
        </div>

        <div>
          <h1 className="font-bold text-xl mb-3">Product Price</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="200"
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p>฿</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          id="bestseller"
        />
        <label className="font-bold text-xl">Add to bestseller</label>
      </div>

      <button className="btn btn-success w-52 text-white">ADD</button>
    </form>
  );
};
export default AddProduct;
