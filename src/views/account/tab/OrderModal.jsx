import React from 'react';
import './OrderModal.css';
import Modal from 'components/ui/Modal';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import Productcard from './ProductCard';
import firebase from '../../../firebase/firebase';

const OrderModal = (props) => {
	const products = props.order.get('products');
	const time = new Date(props.order.get('createdAt'));
	const status = props.order.get('status');
	const mode = props.order.get('paymentMode');
	const cancelOrderHandler = () => {
		const con = confirm('Do you want to cancel this order?');
		if (con) {
			firebase.db
				.collection('orders')
				.doc(props.order.id)
				.update({ status: 'canceled' });
			displayActionMessage('order canceled!', 'info');
		}
	};
	return (
		<Modal
			isOpen={props.isOpenModal}
			onRequestClose={props.onCloseModal}
			overrideStyle={{ padding: '10px', width: window.innerWidth > 400 ? '50%' : '80%' }}
		>
			<h3>Order Details</h3>
			{products.map(el => (
				<Productcard key={el}
					product={el}
				/>
			))}
			<h5 className="basket-item-price">
        total : {displayMoney(props.order.get('amount'))}
			</h5>
			<h5 className="basket-item-price">
				payment mode : {mode}
			</h5>
			<h5 className="basket-item-price">
        Order placed on {time.toISOString().slice(0, 10)},
				{time.toLocaleTimeString()}
			</h5>
			<div>Status : {status.toUpperCase()}</div>
			<div className="product-modal-action order-button-modal">
				<button className={'button button-small '}
					disabled={status === 'canceled' || status === 'delivered'}
					onClick={cancelOrderHandler}
				>
          Cancel Order
				</button>
				<button className={'button button-small '}

					onClick={props.nextHandler}
				>
          Next Order
				</button>
			</div>
			<button className="modal-close-button"
				onClick={props.onCloseModal}
			>
				<i className="fa fa-times-circle" />
			</button>
		</Modal>
	);
};

export default OrderModal;
