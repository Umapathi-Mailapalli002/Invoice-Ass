import React, { useEffect, useState } from "react";
import InfoTable from "./InfoTable";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import { generateInvoicePDF } from "../utils/generateInvoicePDF";
import SearchBar from "./SearchBar";
import { deleteSale, getAllSales } from "../features/saleSlice";

function SalesTable() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortByDate: "",
    sortByCustomerName: "",
    sortById: "",
    sortByQuantity: "",
  });
  const navigate = useNavigate();
  const categories = [
    "All",
    "Electronics",
    "Home Appliances",
    "Kitchen Appliances",
    "Furniture",
  ];
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const sales = useSelector((state) => state.sales);
  const allSales = sales?.sales;
  const pageSize = 5;

  // Fetch sales data when filters change
  useEffect(() => {
    dispatch(getAllSales(filters));
  }, [dispatch, filters]);

  const handleSort = (key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: prevFilters[key] === "asce" ? "desc" : "asce",
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters, // Spread the previous filter state
      category: categoryValue ? categoryValue : "", // Set the category filter, empty string means no category filter
    }));
  };

  const columns = [
    {
      label: (
        <span
          onClick={() => handleSort("sortByCustomerName")}
          className="cursor-pointer"
        >
          Customer Name{" "}
          {filters.sortByCustomerName === "asce" ? (
            <HiArrowSmUp className="inline-block text-lg" />
          ) : filters.sortByCustomerName === "desc" ? (
            <HiArrowSmDown className="inline-block text-lg" />
          ) : null}
        </span>
      ),
      key: "customerName",
    },
    { label: "Product Name", key: "productName" },
    {
      label: (
        <span
          onClick={() => handleSort("sortByQuantity")}
          className="cursor-pointer"
        >
          Quantity{" "}
          {filters.sortByQuantity === "asce" ? (
            <HiArrowSmUp className="inline-block text-lg" />
          ) : filters.sortByQuantity === "desc" ? (
            <HiArrowSmDown className="inline-block text-lg" />
          ) : null}
        </span>
      ),
      key: "quantity",
    },
    { label: "Category", key: "category" },
    { label: "Price", key: "price" },
    { label: "Total Amount", key: "totalAmount" },
    {
      label: (
        <span
          onClick={() => handleSort("sortByDate")}
          className="cursor-pointer"
        >
          Date{" "}
          {filters.sortByDate === "asce" ? (
            <HiArrowSmUp className="inline-block text-lg" />
          ) : filters.sortByDate === "desc" ? (
            <HiArrowSmDown className="inline-block text-lg" />
          ) : null}
        </span>
      ),
      key: "date",
    },
  ];

  const handleDelete = (item) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    );

    if (isConfirmed) {
      dispatch(deleteSale({ id: item._id }));
      alert("Item deleted successfully.");
      console.log("Deleted item:", item._id);
    } else {
      alert("Deletion canceled. The item was not deleted.");
      console.log("Deletion canceled for item:", item._id);
    }
  };

  const handleEdit = (item) => {
    navigate("/invoice", { state: { item } });
    console.log("Edited item:", item._id);
  };
  const handleDownload = (item) => {
    generateInvoicePDF({
      ...item,
    });
    console.log("Delete item:", item._id);
  };
  const actions = [
    {
      label: "Delete",
      icon: <MdDelete className="text-2xl" />,
      type: "delete",
      onClick: handleDelete,
    },
    {
      label: "Edit",
      icon: <FaRegEdit />,
      type: "edit",
      onClick: handleEdit,
    },
    {
      label: "Download",
      icon: <FaFilePdf className="text-green-600" />,
      type: "download",
      onClick: handleDownload,
    },
  ];
  return (
    <div className="grid justify-items-center mt-10">
      <div className="grid gap-5 sm:grid-cols-2 justify-items-end mb-5">
        <SearchBar
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              search: e.target.value,
            }))
          }
          value={filters.search}
          className="w-72"
          placeholder="Search by Customer or Product"
        />
        <Link to="/invoice">
          <Button className="font-medium h-10">Create Entry</Button>
        </Link>
      </div>
      <div className="flex items-center space-x-4 p-4">
        <label
          htmlFor="category"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Filter by Category:
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="block p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-300 dark:focus:border-indigo-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <InfoTable
        title="Invoices"
        loading={sales.loading}
        columns={columns}
        data={allSales}
        actions={actions}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default SalesTable;
