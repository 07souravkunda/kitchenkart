import React, { useState, useEffect } from 'react';
import Boundary from 'components/ui/Boundary';
import OrderItem from 'components/order/OrderItem';
import firebase from '../../../firebase/firebase';
import FilterModal from './filterModal';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [disable, setDisable] = useState(false);
	const [show, setShow] = useState(false);
	const [filter, setFilter] = useState({
		status: 'all', mode: 'all', name: '', email: '', createdAt: '' 
	});
	const [loading, setLoading] = useState(false);
	const limit = 10;
	const fetchOrders = async () => {
		setDisable(false);
		setLoading(true);
		let docs;
		if ((filter.name && filter.name !== '') || (filter.email && filter.email !== '') || filter.createdAt !== '') {
			docs = await firebase.getDBInstance().collection('orders').orderBy('createdAt', 'desc').get();
			docs = docs.docs;
			if (filter.name !== '') docs = docs.filter(el => el.get('shippingDetails').fullname.toLowerCase() === filter.name.toLowerCase());
			if (filter.email !== '') {
				docs = docs.filter(el => el.get('shippingDetails').email.toLowerCase() === filter.email.toLowerCase());
			}
			if (filter.mode !== 'all') {
				docs = docs.filter(el => el.get('paymentMode').toLowerCase() === filter.mode.toLowerCase());
			} if (filter.status !== 'all') {
				docs = docs.filter(el => el.get('status').toLowerCase() === filter.status.toLowerCase());
			}
			if (filter.createdAt !== '') {
				docs = docs.filter((el) => { return new Date(el.get('createdAt')).toISOString().slice(0, 10) === filter.createdAt; });
			}
			docs = docs.slice(0, limit);
		} else {
			let query = firebase
				.getDBInstance()
				.collection('orders')
				.orderBy('createdAt', 'desc');
			if (filter.status !== 'all') {
				query = query.where('status', '==', filter.status);
			}
			if (filter.mode !== 'all') {
				query = query.where('paymentMode', '==', filter.mode);
			}
		
			// if (filter.name && filter.name !== '') {
			// 	query = query.where('shippingDetails', '==', { email: filter.email });
			// }
			query = query.limit(limit);
			const res = await query.get();
			docs = res.docs;
		}
		
		if (docs.length < limit) {
			setDisable(true);
		}
		setOrders(docs);
		setLoading(false);
	};
	const getMore = async () => {
		setDisable(false);
		let docs;
		if ((filter.name && filter.name !== '') || (filter.email && filter.email !== '')) {
			docs = await firebase.getDBInstance().collection('orders').orderBy('createdAt', 'desc').get();
			docs = docs.docs;
			docs = docs.filter(el => el.get('shippingDetails').fullname.toLowerCase() === filter.name.toLowerCase());
			if (filter.email !== '') {
				docs = docs.filter(el => el.get('shippingDetails').email.toLowerCase() === filter.email.toLowerCase());
			}
			if (filter.mode !== 'all') {
				docs = docs.filter(el => el.get('paymentMode').toLowerCase() === filter.mode.toLowerCase());
			} if (filter.status !== 'all') {
				docs = docs.filter(el => el.get('status').toLowerCase() === filter.status.toLowerCase());
			}
			if (filter.createdAt !== '') {
				docs = docs.filter((el) => { return new Date(el.get('createdAt')).toISOString().slice(0, 10) === filter.createdAt; });
			}
			docs = docs.slice(orders.length, orders.length + limit);
		} else {
			let query = firebase
				.getDBInstance()
				.collection('orders').orderBy('createdAt', 'desc');
			if (filter.status !== 'all') {
				query = query.where('status', '==', filter.status);
			}
			if (filter.mode !== 'all') {
				query = query.where('paymentMode', '==', filter.mode);
			}
			query = query.startAfter(orders[orders.length - 1].get('createdAt'))
				.limit(limit);
			const res = await query.get();
			docs = res.docs;
		}
		if (docs.length < limit) {
			setDisable(true);
		}
		setOrders(pre => [...pre, ...docs]);
	};
	useEffect(() => {
		fetchOrders();
	}, [filter]);
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
          		Orders &nbsp;
					{/* ({`${store.productsLength} / ${store.totalItems}`}) */}
				</h3>
				<button className="button-muted button-small"
					onClick={() => setShow(true)}
				>
            		More Filters &nbsp;
					<i className="fa fa-chevron-right" />
				</button>
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
				{loading
					? new Array(10)
						.fill({})
						.map((order, index) => (
							<OrderItem key={`product-skeleton ${index}`}
								order={order}
							/>
						))
					: <>{orders.map((el) => {
						return <OrderItem id={el.id}
							key={el.id}
							order={el}
						       />;
					})}	 	{orders.length === 0 ? <p>No orders yet</p> : null} <button className={'button button-small '}
						disabled={disable}
						onClick={getMore}
					                                                          >show more</button></>
				}
			
				<FilterModal 
				
					applyFilter = {(obj) => { setFilter(obj); setShow(false); }}
					filters={filter}
					isOpenModal={show}
					onCloseModal={() => setShow(false)}
				
				/>
			</div>
		</Boundary>
	);
};

export default Orders;
