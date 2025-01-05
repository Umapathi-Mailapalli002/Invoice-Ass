import React, { useState, useContext } from "react";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createSale, updateSale } from "../features/saleSlice";
import Loading from "./Loading";
const InvoiceForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const item = location.state?.item;
  const categories = [
    "Electronics",
    "Home Appliances",
    "Kitchen Appliances",
    "Furniture",
  ];
  const [invoiceData, setInvoiceData] = useState({
    customerName: "" || item?.customerName,
    productName: "" || item?.productName,
    category: "" || item?.category,
    price: "" || item?.price,
    quantity: "" || item?.quantity,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Calculate the total price dynamically
  const totalAmount =
    invoiceData.price && invoiceData.quantity
      ? parseFloat(invoiceData.price) * parseInt(invoiceData.quantity)
      : 0 || item?.totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item) {
        await dispatch(updateSale({ ...invoiceData, id: item._id })).unwrap();
        alert("Invoice updated successfully!");
      } else {
        await dispatch(createSale({ ...invoiceData })).unwrap();
        alert("Invoice added successfully!");
      }
      navigate("/sales");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-800 rounded shadow max-w-md mx-auto w-full"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Create New Invoice
      </h2>

      <InputBox
        type="text"
        value={invoiceData.customerName}
        onChange={(e) =>
          setInvoiceData({ ...invoiceData, customerName: e.target.value })
        }
        placeholder="Customer Name"
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <InputBox
        type="text"
        value={invoiceData.productName}
        onChange={(e) =>
          setInvoiceData({ ...invoiceData, productName: e.target.value })
        }
        placeholder="Product Name"
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Category Dropdown */}
      <select
        value={invoiceData.category}
        onChange={(e) =>
          setInvoiceData({ ...invoiceData, category: e.target.value })
        }
        className=" p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-300 dark:focus:border-indigo-500"
      >
        <option className="w-auto" value="">
          Select category
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <InputBox
        type="number"
        value={invoiceData.price}
        onChange={(e) =>
          setInvoiceData({ ...invoiceData, price: e.target.value })
        }
        placeholder="Price"
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <InputBox
        type="number"
        value={invoiceData.quantity}
        onChange={(e) =>
          setInvoiceData({ ...invoiceData, quantity: e.target.value })
        }
        placeholder="Quantity"
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Display the total amount */}
      <p className="text-lg font-medium text-gray-800 dark:text-white mt-4">
        Total Amount: {totalAmount.toFixed(2)}
      </p>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {!item ? "Submit" : "Update"}
      </button>
    </form>
  );
};

export default InvoiceForm;
