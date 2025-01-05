import React, { useEffect, useState } from "react";
import InfoTable from "./InfoTable";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import SearchBar from "./SearchBar";
function ActivityTable() {
  const [currentPageActivity, setCurrentPageActivity] = useState(1);
  const [currentPageMostSold, setCurrentPageMostSold] = useState(1);
  const { activityLogs, loading } = useSelector((state) => state.activityLogs);
  const mostSales = useSelector((state) => state.sales);
  console.log(activityLogs.data);
  console.log(mostSales.mostSoldProducts);
  const activityData = activityLogs?.data;
  const mostSoldSales = mostSales.mostSoldProducts;
  const pageSize = 5;
  const columnsActivities = [
    { label: "Username", key: "user" },
    { label: "Operation", key: "actionType" },
    { label: "Date", key: "dateAccessed" },
  ];
  const columnsMostSolds = [
    { label: "Product", key: "_id" },
    { label: "Quantity", key: "totalQuantity" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-10 justify-items-center">
      {/* <SearchBar className="w-72 mb-5" placeholder="search by username or email"/> */}
      <InfoTable
        title="Recent Activities"
        loading={loading}
        columns={columnsActivities}
        data={activityData}
        actions={""}
        currentPage={currentPageActivity}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPageActivity(page)}
      />
      <InfoTable
        title="Most Sold"
        loading={mostSales?.loading}
        columns={columnsMostSolds}
        data={mostSoldSales}
        actions={""}
        currentPage={currentPageMostSold}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPageMostSold(page)}
      />
    </div>
  );
}

export default ActivityTable;
