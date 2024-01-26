import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "../firebase.js";
import { useStateValue } from "../StateProvider";
import Order from "./Order.js";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  console.log("<<<< USER >>>> ", user);
  console.log("<<<< ORDERS State >>>> ", orders);

  useEffect(() => {
    if (user) {
      console.log("YES If Statement ");
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log("snaphot >>>> ", snapshot.docs);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      console.log("NO Else Statement ");
      setOrders([]);
    }
  }, [user]);
  //useEffect refreshes everytime '[user]' changes

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
