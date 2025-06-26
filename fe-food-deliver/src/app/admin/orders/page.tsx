"use client"; 

import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "./_component/data-table";
import { columns, Payment } from "./_component/column"


const AdminHomePage = () => {
  const [order, setOrder] = useState([]);
  console.log(order)

  useEffect( () => {

  const fetchData = async () => {
    const token = window?.localStorage?.getItem("token");

    const response: any = await axios.get("http://localhost:8000/admin/getAllOrder", 
      {
      headers: {
        Authorization: `Bearer ${token}`
      },
    } 
  );
   setOrder(response.data.allOrders) 
}
  fetchData() }, [])

  const data: Payment[]= order.map((el:any, index) => 
    ({
      number: index + 1,
      customer: `${el.user.email}`, 
      food: `${el.foodOrderItems?.length || 0} hool`,
      date: new Date(el.createdAt), 
      total: el.totalPrice, 
      status: el.status, 
      address: "odoohondoo bhgui"
    })
  )


  return  <div className="container mx-auto py-10">
  <DataTable columns={columns} data={data} />
  This is admin AdminHomePage
  <button >hi</button>
</div>
};

export default AdminHomePage;
