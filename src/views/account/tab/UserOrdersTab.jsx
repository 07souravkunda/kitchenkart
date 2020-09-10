import React, { useEffect, useState } from 'react';
import firebase from '../../../firebase/firebase';
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
// Just add this feature if you want :P

const UserOrdersTab = () => {
	const limit = 10;
	const [orders, setOrders] = useState([]);
	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(0);
	const [disable, setDisable] = useState(false);
	const getOrders = async () => {
		// console.log(await firebase.getOrders(firebase.getUserId()));
		const res = await firebase
			.getDBInstance()
			.collection('orders')
			.where('userId', '==', firebase.getUserId()).orderBy('createdAt', 'desc')
			.limit(limit)
			.get();
		setOrders(res.docs);
	};
	const getMore = async () => {
		const res = await firebase
			.getDBInstance()
			.collection('orders')
			.where('userId', '==', firebase.getUserId()).orderBy('createdAt', 'desc')
			.startAfter(orders[orders.length - 1].get('createdAt'))
			.limit(limit)
			.get();
		if (res.docs.length < 2) {
			setDisable(true);
		}
		setOrders(pre => [...pre, ...res.docs]);
	};
	console.log(orders);
	useEffect(() => {
		getOrders();
	}, []);
	if (window.location.pathname === '/orders') {
		return <div>
			<h3>My Orders</h3>
			<p>* Orders have no return policy.</p>
			{orders.length > 0 ? <OrderCard
          		clickHandler={() => {
          			setShow(true);
          			setIndex(0);
          		}}

          		orderDoc={orders[0]}
			                     /> : null}
								 {orders.length > 0 ? (
				<OrderModal
					isOpenModal={show}
					nextHandler={() => {
						setIndex(ind => (ind + 1) % orders.length);
					}}
					onCloseModal={() => setShow(false)}
					order={orders[index]}
				/>
			) : null}
		</div>; 
	}
	console.log('hell');
	return (
		<div>
			<h3>My Orders</h3>
			<p>* Orders have no return policy.</p>
			{orders.length > 0 ? (
        <>
          {orders.map((el, ind) => (
          	<OrderCard
          		clickHandler={() => {
          			setShow(true);
          			setIndex(ind);
          		}}
          		key={el.id}
          		orderDoc={el}
          	/>
          ))}
		 
		  <button className={'button button-small '}
		  	disabled={disable}
		  	onClick={getMore}
		  >show more</button>
        </>
			) : null}
			 {orders.length === 0 ? <p>No orders yet</p> : null}
			{orders.length > 0 ? (
				<OrderModal
					isOpenModal={show}
					nextHandler={() => {
						setIndex(ind => (ind + 1) % orders.length);
					}}
					onCloseModal={() => setShow(false)}
					order={orders[index]}
				/>
			) : null}
		</div>
	);
};

export default UserOrdersTab;
