import { useContext } from 'react';
import { ProductDataContext } from '../context/ProductContext';

const FilterProduct = () => {
  const {
    name,
    setName,
    setCategory,
    startDate,
    setStartDate,
    products,
    filterProducts,
    resetFilters,
  } = useContext(ProductDataContext);
  return (
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
              onChange={(e) => setCategory(e.target.value.toLowerCase())}
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
          <button className="btn btn-wide btn-primary" onClick={filterProducts}>
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
  );
};
export default FilterProduct;
