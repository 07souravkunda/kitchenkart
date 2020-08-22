import React from 'react';
import { displayMoney } from 'helpers/utils';
const OrderCard = (props) => {
  const { orderDoc } = props;
  const product = orderDoc.get('products');
  console.log(orderDoc.get('createdAt'));
  return (
    <div className="basket-item" onClick={props.clickHandler}>
      <div className="basket-item-wrapper">
        <div className="basket-item-details">
          {product.map((el) => {
            return (
              <h5 key={el.id} className="basket-item-name">
                {el.name} <span>{` (x ${el.quantity}) `}</span>{' '}
              </h5>
            );
          })}

          <h5 className="basket-item-price">
            total : {displayMoney(orderDoc.get('amount'))}
          </h5>
        </div>
        <div className="position-relative margin-right-l">
          <div>Your Order Placed</div>
          <div className="position-relative margin-right-l">
            <div>Status : {orderDoc.get('status')}</div>
            {/* <div>Order placed on {orderDoc.get('createdAt')}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
