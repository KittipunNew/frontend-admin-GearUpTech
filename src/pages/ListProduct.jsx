import { useContext } from 'react';
import BestSeller from './../components/BestSeller';
import FilterProduct from './../components/FilterProduct';
import { ProductDataContext } from '../context/ProductContext';
import { trashIcon, infoIcon, xMark } from '../assets/icon';

const ListProduct = () => {
  const {
    filteredProducts,
    addToBestseller,
    editedProduct,
    setEditedProduct,
    updateProductInfo,
    handleDelete,
  } = useContext(ProductDataContext);
  return (
    <div className="flex flex-col gap-10">
      <FilterProduct />
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
                <th className="w-20"></th>
                <th className="w-40"></th>
                <th className="w-2/4">Name</th>
                <th className="w-2/4">Category</th>
                <th className="w-2/4">Price</th>
                <th className="w-1/3"></th>
                <th className="w-1/3"></th>
                <th className="w-1/3"></th>
              </tr>
            </thead>
          </table>
          <div className="max-h-96 overflow-y-auto">
            <table className="table table-fixed w-full">
              <tbody>
                {filteredProducts.map((item, index) => (
                  <tr key={index} className="text-lg">
                    {/* info button */}
                    <th className="w-20">
                      <button
                        className=""
                        onClick={() =>
                          document
                            .getElementById(`modal_${item._id}`)
                            .showModal()
                        }
                      >
                        {infoIcon}
                      </button>
                      <dialog id={`modal_${item._id}`} className="modal">
                        <div className="modal-box h-[850px]">
                          <div className="modal-action">
                            <form method="dialog">
                              <button>{xMark}</button>
                            </form>
                          </div>
                          <h3 className="font-bold text-3xl">information</h3>
                          <div>
                            <h1 className="my-3">{item.name}</h1>
                            <h1 className="my-3 font-medium">
                              {item.description}
                            </h1>
                            <ul className="list-disc ml-5">
                              {item.specs.map((spec, index) => (
                                <div key={index}>
                                  {spec ? (
                                    <li>{spec}</li>
                                  ) : (
                                    <li className="hidden"></li>
                                  )}
                                </div>
                              ))}
                            </ul>
                            <h1 className="my-3 text-xl">
                              {item.price.toLocaleString()}
                              <span className="text-sm ml-1">฿</span>
                            </h1>
                            <div className="flex flex-col items-center justify-center gap-2">
                              {item.images.map((item, index) => (
                                <img src={item} key={index} className="w-60" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </dialog>
                    </th>

                    {/* image, name, category, price */}
                    <td className="w-40">
                      <img src={item.images[0]} alt="" className="w-20" />
                    </td>
                    <td className="w-2/4">{item.name}</td>
                    <td className="w-2/4">{item.category.toUpperCase()}</td>
                    <td className="w-2/4">{item.price.toLocaleString()}</td>

                    {/* add bestseller button */}
                    <td className="w-1/3">
                      {item.bestseller ? (
                        <button className="btn" disabled="disabled">
                          Bestseller
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => addToBestseller(item._id)}
                        >
                          Add Bestseller
                        </button>
                      )}
                    </td>

                    {/* edit button */}
                    <td className="w-1/3">
                      <button
                        className="btn"
                        onClick={() => {
                          setEditedProduct({
                            name: item.name,
                            category: item.category,
                            description: item.description,
                            specs: item.specs,
                            price: item.price,
                          });
                          document
                            .getElementById(`modal_edit_${item._id}`)
                            .showModal();
                        }}
                      >
                        Edit
                      </button>
                      <dialog id={`modal_edit_${item._id}`} className="modal">
                        <div className="modal-box h-[850px]">
                          <h3 className="font-bold text-lg">
                            Edit product information
                          </h3>
                          <form className="space-y-5">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="productname">Product name</label>
                              <input
                                type="text"
                                className="input"
                                value={editedProduct.name}
                                onChange={(e) =>
                                  setEditedProduct({
                                    ...editedProduct,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label>Product category</label>
                              <select
                                className="select"
                                onChange={(e) =>
                                  setEditedProduct({
                                    ...editedProduct,
                                    category: e.target.value.toLowerCase(),
                                  })
                                }
                              >
                                <option disabled>Category</option>
                                <option>PC</option>
                                <option>Notebook</option>
                                <option>Monitor</option>
                                <option>Accessorie</option>
                                <option>Chair</option>
                                <option>Network</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="productdescription">
                                Description
                              </label>
                              <textarea
                                className="textarea h-52"
                                value={editedProduct.description}
                                onChange={(e) =>
                                  setEditedProduct({
                                    ...editedProduct,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="spec">
                                Technical specifications
                                <span className="text-sm text-red-500 ml-1">
                                  (***Please enter each specification on a new
                                  line.***)
                                </span>
                              </label>
                              <textarea
                                className="textarea h-52"
                                value={editedProduct.specs.join('\n')}
                                onChange={(e) =>
                                  setEditedProduct({
                                    ...editedProduct,
                                    specs: e.target.value.split('\n'),
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="price">Price</label>
                              <div className="flex items-center gap-2">
                                <input
                                  className="input"
                                  value={editedProduct.price}
                                  onChange={(e) =>
                                    setEditedProduct({
                                      ...editedProduct,
                                      price: e.target.value,
                                    })
                                  }
                                />
                                <h1>฿</h1>
                              </div>
                            </div>
                          </form>
                          <div className="modal-action flex justify-start">
                            <form method="dialog" className="space-x-5">
                              <button
                                className="btn btn-primary"
                                onClick={() => updateProductInfo(item._id)}
                              >
                                Save
                              </button>
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>

                    {/* delete button */}
                    <td className="w-1/3">
                      <button
                        className="text-red-500"
                        onClick={() =>
                          document
                            .getElementById(`modal_delete_${item._id}`)
                            .showModal()
                        }
                      >
                        {trashIcon}
                      </button>
                      <dialog id={`modal_delete_${item._id}`} className="modal">
                        <div className="modal-box ">
                          <h3 className="font-bold text-lg">
                            Confirm Deletion
                          </h3>
                          <p className="py-4">
                            Are you sure you want to permanently delete this
                            item? This action cannot be undone.
                          </p>
                          <div className="modal-action">
                            <form method="dialog" className="flex gap-5">
                              <button
                                className="btn btn-error text-white"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
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
      <BestSeller />
    </div>
  );
};
export default ListProduct;
