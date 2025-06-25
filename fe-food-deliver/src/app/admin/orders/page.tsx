import axios from "axios";
import { useEffect, useState } from "react";
// import { columns, Payment } from "./columns"
// import { DataTable } from ".orders/_component"

const AdminHomePage = () => {
  const [order, setOrder] = useState([]);

  useEffect( () => {

    const fetchOrder
        const token = localStorage?.getItem("token");
    const response = await axios.get("http://localhost:8000/admin/getAllOrder", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } 
  ) 
  }, [])
 


  console.log(response)

  // const data = await getData()

  return  <div className="container mx-auto py-10">
  {/* <DataTable columns={columns} data={data} /> */}
  This is admin AdminHomePage
</div>
};

export default AdminHomePage;
