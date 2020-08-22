import React from 'react';
import './OrderModal.css';
import Modal from 'components/ui/Modal';
import Productcard from './ProductCard';
import { displayMoney } from 'helpers/utils';
const OrderModal = (props) => {
  const products = props.order.get('products');
  const time = new Date(props.order.get('createdAt'));
  return (
    <Modal
      isOpen={props.isOpenModal}
      onRequestClose={props.onCloseModal}
      overrideStyle={{ padding: '10px', width: '50%' }}
    >
      <h3>Order Details</h3>
      {products.map((el) => (
        <Productcard product={el} />
      ))}
      <h5 className="basket-item-price">
        total : {displayMoney(props.order.get('amount'))}
      </h5>

      <h5 className="basket-item-price">
        Order placed on {time.toISOString().slice(0, 10)},
        {time.toLocaleTimeString()}
      </h5>
      <div>Status : {props.order.get('status').toUpperCase()}</div>
      <div className="product-modal-action order-button-modal">
        <button
          className={`button button-small `}
          //   onClick={onAddToBasket}
        >
          Cancel Order
        </button>
        <button className={`button button-small `} onClick={props.nextHandler}>
          Next Order
        </button>
      </div>
      <button className="modal-close-button" onClick={props.onCloseModal}>
        <i className="fa fa-times-circle" />
      </button>
    </Modal>
  );
};

export default OrderModal;
