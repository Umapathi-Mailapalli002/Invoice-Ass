import React, {useEffect} from 'react'
import UsersTable from '../../components/ActivityTable'
import { useDispatch } from 'react-redux';
import { getAllActivityLogs } from "../../features/activityLogSlice";
import { getMostSoldProducts } from '../../features/saleSlice';

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllActivityLogs());
    dispatch(getMostSoldProducts())
 }, [])

  return (
    <div><UsersTable/></div>
  )
}

export default Dashboard