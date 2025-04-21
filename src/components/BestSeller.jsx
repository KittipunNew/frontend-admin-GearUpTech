import { useContext } from 'react';
import { ProductDataContext } from '../context/ProductContext';

const BestSeller = () => {
  const { bestseller, removeBestseller } = useContext(ProductDataContext);
  return (
    <div>
      {bestseller.length > 0 ? (
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
                  <th className="w-1/3"></th>
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
                      <td className="w-1/3">{item.category.toUpperCase()}</td>
                      <td className="w-1/3">{item.price.toLocaleString()}</td>
                      <td className="w-1/3">
                        <button
                          onClick={() => removeBestseller(item._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Delete from bestseller
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default BestSeller;
