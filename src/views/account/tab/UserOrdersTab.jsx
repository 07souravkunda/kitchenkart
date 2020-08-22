import React, { useEffect, useState } from 'react';
import firebase from '../../../firebase/firebase';
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
// Just add this feature if you want :P

const UserOrdersTab = () => {
  const [orders, setOrders] = useState();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const getOrders = async () => {
    // console.log(await firebase.getOrders(firebase.getUserId()));
    firebase
      .getDBInstance()
      .collection('orders')
      .where('userId', '==', firebase.getUserId())
      .onSnapshot((el) => {
        setOrders(el.docs);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <h3>My Orders</h3>

      {orders ? (
        <>
          {orders.map((el, ind) => (
            <OrderCard
              clickHandler={() => {
                setShow(true);
                setIndex(ind);
              }}
              orderDoc={el}
              key={el.id}
            />
          ))}{' '}
          <OrderModal
            order={orders[index]}
            isOpenModal={show}
            onCloseModal={() => setShow(false)}
            nextHandler={() => {
              setIndex((ind) => (ind + 1) % orders.length);
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default UserOrdersTab;
