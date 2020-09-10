import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CHECKOUT_STEP_2, ORDER_PAGE } from 'constants/routes';
import firebase from 'firebase/firebase';
// import { firestore } from 'firebase';
import axios from 'axios';
import { setPaymentDetails } from 'actions/checkoutActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import { clearBasket } from 'actions/basketActions';
import UserOrdersTab from 'views/account/tab/UserOrdersTab';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import withAuth from '../hoc/withAuth';

const Payment = ({
	profile,
	basket,
	shipping,
	payment,
	subtotal,
	dispatch,
	history
}) => {
	const [paymentMode, setPaymentMode] = useState(payment.type || 'paypal');
	const collapseCreditHeight = useRef(null);
	const cardInputRef = useRef(null);
	const [field, setField] = useState({
		name: { value: payment.data.name ? payment.data.name : '' },
		cardnumber: {
			value: payment.data.cardnumber ? payment.data.cardnumber : ''
		},
		expiry: { value: payment.data.expiry ? payment.data.expiry : '' },
		ccv: { value: payment.data.ccv ? payment.data.ccv : '' }
	});
	const products = useRef();
	const paymentMethod = useRef('COD');

	const onCreditModeChange = (e) => {
		setPaymentMode('credit');
		const parent = e.target.closest('.checkout-fieldset-collapse');
		const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

		// cardInputRef.current.focus();
		parent.style.height = `${
			checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight
		}px`;
	};

	const onPayPalModeChange = () => {
		setPaymentMode('paypal');
		collapseCreditHeight.current.parentElement.style.height = '97px';
	};

	const savePaymentDetails = () => {
		const isChanged = Object.keys(field).some(
      	key => field[key].value !== payment.data[key]
		) || paymentMode !== payment.type;

		if (isChanged) {
			dispatch(
				setPaymentDetails({
					type: paymentMode,
					data: {
						type: paymentMode,
						name: field.name.value,
						cardnumber: field.cardnumber.value,
						expiry: field.expiry.value,
						ccv: field.ccv.value
					}
				})
			);
		}
	};

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		document.body.appendChild(script);
	}, []);
	const options = {
		key: 'rzp_test_ofGKLc97Xvci91',
		amount: (subtotal + 50) * 100, //  = INR 1
		name: 'Acme shop',
		description: 'some description',
		image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
		handler(response) {
			paymentMethod.current = paymentMode;
			SaveToDB(response);
			displayActionMessage('Success', 'info');
		},
		prefill: {
			name: profile.name,
			contact: profile.mobile.value,
			email: profile.email
		},
		notes: {
			address: profile.address
		},
		theme: {
			color: '#2B2B52',
			hide_topbar: false
		}
	};
	async function SaveToDB(response) {
		const order = {
			products: products.current,
			quantity: products.current.length,
			paymentMode: paymentMethod.current,
			shippingDetails: shipping,
			amount: subtotal + 50,
			userId: firebase.getUserId(),
			status: 'ordered',
			createdAt: Date.now(),
			canceled: false
		};
		if (response.razorpay_payment_id) {
			order.paymentId = response.razorpay_payment_id;
		}
		try {
			await firebase.addOrder(order);
			dispatch(clearBasket());
			history.push(ORDER_PAGE);
			// axios.post('http://localhost:5000/api/v1/email', {
			// 	email: shipping.email,
			// 	message: `<p>Hello ${shipping.fullname}!</p><br><p>Your order has been successful!</p><p>Track your order <a href='http://localhost:8081/orders'>here</a></p><br><p>Regards!<p>Kitechen Kart!`,
			// 	subject: 'Order sucessful!'
			// });
			// axios.post('http://localhost:5000/api/v1/message', {
			// 	message: 'Your order is successful! Track order here http://localhost:8081/orders',
			// 	number: `+${shipping.mobile.data.dialCode}${shipping.mobile.data.num}`
			// });
		} catch (er) {
			console.log(er);
		}
	}
	const onConfirm = (e) => {
		e.preventDefault();
  
		products.current = basket;
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(
			key => !!field[key].value && !field[key].error
		);

		if (!paymentMode) return;
		if (paymentMode === 'credit') {
			displayActionMessage('Good Choice :)', 'info');
			const rzp1 = new window.Razorpay(options);
			rzp1.open();

			// TODO: fire only if changed
			// savePaymentDetails();
			// Do some action here. :)
		} else {
			SaveToDB(basket);
			displayActionMessage('Order placed successfully :)', 'info');
		}

		// Redirect to orders page
		// <Redirect to="/userorderstab"/>
	};

	const onClickBack = () => {
		savePaymentDetails();
		history.push(CHECKOUT_STEP_2);
	};

	return !shipping.isDone ? (
		<Redirect to="/checkout/step1" />
	) : (
		<div className="checkout">
			<StepTracker current={3} />
			<div className="checkout-step-3">
				<CreditPayment
					field={field}
					onCreditModeChange={onCreditModeChange}
					paymentMode={paymentMode}
					ref={{
						cardInputRef,
						collapseCreditHeight
					}}
					setField={setField}
				/>
				<PayPalPayment
					onPayPalModeChange={onPayPalModeChange}
					paymentMode={paymentMode}
				/>
				<br />
				<div className="basket-total text-right">
					<p className="basket-total-title">Total:</p>
					<h2 className="basket-total-amount">{displayMoney(subtotal + 50)}</h2>
				</div>
				<br />
				<Pagination
					// eslint-disable-next-line no-extra-boolean-cast
					disabledNext={!!!paymentMode}
					history={history}
					nextStepLabel="Confirm"
					onClickNext={onConfirm}
					onClickPrevious={onClickBack}
				/>
			</div>
		</div>
	);
};

export default withAuth(Payment);
