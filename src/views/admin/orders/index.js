import React, { useState, useEffect } from 'react';
import Boundary from 'components/ui/Boundary';
import firebase from '../../../firebase/firebase';
import OrderItem from 'components/order/OrderItem';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    firebase.db.collection('orders').onSnapshot((snap) => {
      console.log(snap.docs);
      setOrders(snap.docs);
    });
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Boundary>
      <div className="product-admin-header">
        <h3 className="product-admin-header-title">
          Users &nbsp;
          {/* ({`${store.productsLength} / ${store.totalItems}`}) */}
        </h3>
      </div>
      <div className="product-admin-items">
        <div className="grid grid-product grid-count-6">
          <div className="grid-col">
            <h5>Products</h5>
          </div>
          <div className="grid-col">
            <h5>Shipping Address</h5>
          </div>
          <div className="grid-col">
            <h5>Orderd On</h5>
          </div>
          <div className="grid-col">
            <h5>total amount</h5>
          </div>
          <div className="grid-col">
            <h5>payment method</h5>
          </div>
          <div className="grid-col">
            <h5>status</h5>
          </div>
        </div>
        {orders.length === 0
          ? new Array(10)
              .fill({})
              .map((order, index) => (
                <OrderItem key={`product-skeleton ${index}`} order={order} />
              ))
          : orders.map((el) => {
              return <OrderItem key={el.id} order={el} id={el.id} />;
            })}
      </div>
    </Boundary>
  );
};

export default Orders;
