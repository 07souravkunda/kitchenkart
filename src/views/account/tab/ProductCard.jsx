import React from 'react';
import Badge from 'components/ui/Badge';
import { displayMoney } from 'helpers/utils';

const Productcard = ({ product }) => {
  return (
    <div className="basket-item-wrapper">
      <div className="basket-item-img-wrapper">
        <img src={product.image} className="basket-item-img"></img>
      </div>
      <div className="basket-item-details">
        <h5 className="basket-item-name">
          {product.name}
          <span>{` (x ${product.quantity}) `}</span>
        </h5>
        <h5 className="basket-item-price">
          {displayMoney(product.price * product.quantity)}
        </h5>
      </div>
      <div className="position-relative margin-right-l">
        <div className="position-relative margin-right-l">
          <Badge count={product.quantity} />
        </div>
      </div>
    </div>
  );
};

export default Productcard;
