/* eslint-disable no-else-return */
import React from 'react';
import Input from 'components/ui/Input';

const CreditPayment = React.forwardRef(({
	onCreditModeChange,
	paymentMode,
	setField,
	field
}, ref) => {
	const { cardInputRef, collapseCreditHeight } = ref;

	

	



	


	return (
		<form>
			<h3 className="text-center">Payment</h3>
			<br />
			<span className="d-block padding-s">Payment Option</span>
			<div className={`checkout-fieldset-collapse ${paymentMode === 'credit' ? 'is-selected-payment' : ''}`}>
				<div className="checkout-field margin-0">
					<div className="checkout-checkbox-field">
						<input
							checked={paymentMode === 'credit'}
							className=""
							id="payment-credit-checkbox"
							name="checkout_payment"
							onChange={onCreditModeChange}
							type="radio"
						/>
						<label className="d-flex w-100" htmlFor="payment-credit-checkbox">
							<div className="d-flex-grow-1 margin-left-s">
								<h4 className="margin-0">Prepaid Payment</h4>
								<span className="text-subtle d-block margin-top-s">
									Pay with card,wallets and many more
								</span>
							</div>
							<div className="d-flex">
								<div className="payment-img payment-img-visa" />
								&nbsp;
								<div className="payment-img payment-img-mastercard" />
							</div>
						</label>
					</div>
				</div>
				<div className="checkout-collapse-sub" ref={collapseCreditHeight}>
					
					<br />
					<div className="checkout-field margin-0">
						<div className="checkout-fieldset">
							
						
						
							
						</div>
					</div>
				</div>
			</div>
		</form>
	);
});

export default CreditPayment;
