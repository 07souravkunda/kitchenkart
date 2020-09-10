import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import firebase from '../../firebase/firebase';

const OrderItem = (props) => {
	const { order } = props;
	//   console.log(order, order.get('email'));
	const [status, setStatus] = useState(
		props.id ? order.get('status') : undefined
	);
	let amount; let products; let address; let date; let 
		method;
	if (props.id) {
		products = order.get('products');
		address = order.get('shippingDetails');
		amount = order.get('amount');
		date = order.get('createdAt');
		method = order.get('paymentMode');
	}
	const changeHandler = (status) => {
		firebase.db.collection('orders').doc(props.id).update({ status });
		setStatus(status);
	};
	return (
		<SkeletonTheme color="#e1e1e1"
			highlightColor="#FFFFFF"
		>
			<div className="grid grid-product grid-count-6">
				<div className="grid-col">
					{products ? (
						products.map((el, index) => {
							return (
								<div key={`${index}`}>
									{el.name}({el.quantity})
								</div>
							);
						})
					) : (
						<Skeleton width={80} />
					)}
				</div>
				<div className="grid-col">
					<h5>
						{address ? (
              <>
                <div>{address.address}</div>
                <div>{address.email}</div>
                <div>{address.fullname}</div>
              </>
						) : (
							<Skeleton width={80} />
						)}
					</h5>
				</div>
				<div className="grid-col">
					<h5>
						{date ? (
              <>
                <div>{new Date(date).toISOString().slice(0, 10)}</div>
                <div>{new Date(date).toLocaleTimeString()}</div>
              </>
						) : (
							<Skeleton width={80} />
						)}
					</h5>
				</div>

				<div className="grid-col">
					<h5>{amount || <Skeleton width={80} />}</h5>
				</div>
				<div className="grid-col">
					<h5>{method || <Skeleton width={80} />}</h5>
				</div>
				<div className="grid-col">
					{/* <h5> */}
					{status ? (
						<select
							onChange={(e) => {
								changeHandler(e.target.value);
							}}
							value={status}
						>
							<option value="ordered">Ordered</option>
							<option value="shipped">Shipped</option>
							<option value="delivered">Delivered</option>
							<option value="canceled">Canceled</option>
						</select>
					) : (
						<Skeleton width={80} />
					)}
					{/* </h5> */}
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default OrderItem;
