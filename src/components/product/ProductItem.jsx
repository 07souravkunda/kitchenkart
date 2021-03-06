import React ,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';

import { removeFromBasket, addToBasket } from 'actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import ImageLoader from '../ui/ImageLoader';
import {firestore} from 'firebase/app';
import firebase from '../../firebase/firebase';

const ProductItem = ({
	product,
	onOpenModal,
	displaySelected,
	foundOnBasket,
	foundOnWishlist
}) => {
	const uid = firebase.getUserId();
	const db = firebase.getDBInstance();
	const dispatch = useDispatch();
	// useEffect(() => {


	// 	console.log(firestore);
		

	// 	// db.collection("users").doc(uid).set({wishlist: firestore}, {merge: true})
	// }, [])

	const onClickItem = () => {
		if (product.id) {
			onOpenModal();
			displaySelected(product);
		}
	};

	const onAddToBasket = () => {
		if (foundOnBasket) {

			dispatch(removeFromBasket(product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			dispatch(addToBasket(product));
			displayActionMessage('Item added to basket', 'success');
		}
	};

	const [color, setcolor] = useState('black')
	
	const onAddToWishlist = () => {
		if(db && uid)
		db.collection("users").doc(uid).set({wishlist: color=='red' ? firestore.FieldValue.arrayRemove(product.id) : firestore.FieldValue.arrayUnion(product.id)}, {merge: true}).then(() => {
			if(color === "red"){

				displayActionMessage('Item removed from Wishlist', 'info');
				setcolor('black')
			}else{
				displayActionMessage('Item added to Wishlist', 'success');
			setcolor('red')

			}
		})
	};


	

	return (
		<SkeletonTheme color="#e1e1e1" highlightColor="#FFFFFF">
				
				<button style={{border:'none',backgroundColor:'white'}} onClick={onAddToWishlist}>
				<i className="fa fa-heart " style={{color:color}}/>
				</button>
			<div
				className={`product-card ${!product.id ? 'product-loading' : ''}`}
				style={{
					border: foundOnBasket ? '1px solid #cacaca' : '',
					boxShadow: foundOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
				}}
			>

				{foundOnBasket && <i className="fa fa-check product-card-check" />}
				<div
					className="product-card-content"
					onClick={onClickItem}
				>
					<div className="product-card-img-wrapper">
						{product.image ? (
							<ImageLoader
							className="product-card-img"
							src={product.image}
							/>
							) : <Skeleton width={'100%'} height={'90%'} />}
					</div>
					<div className="product-details">

					
						<h5 className="product-card-name text-overflow-ellipsis margin-auto">{product.name || <Skeleton width={80} />}</h5>
						<p className="product-card-brand">{product.brand || <Skeleton width={60} />}</p>

						<h4 className="product-card-price">{product.price ? displayMoney(product.price) : <Skeleton width={40} />}</h4>
					</div>
				</div>
				{product.id && (
					<button
						className={`product-card-button button-small button button-block ${foundOnBasket ? 'button-border button-border-gray' : ''}`}
						onClick={onAddToBasket}
					>
						{foundOnBasket ? 'Remove from basket' : 'Add to basket'}
					</button>
				)}

			</div>
		</SkeletonTheme>
	);
};

ProductItem.propType = {
	onClickItem: PropTypes.func,
	dispatch: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired,
	onOpenModal: PropTypes.func,
	foundOnBasket: PropTypes.bool
};

export default ProductItem;
