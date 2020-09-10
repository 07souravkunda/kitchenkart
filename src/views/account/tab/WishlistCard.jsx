import React, { useEffect, useState } from 'react';
import { firestore } from 'firebase';
import Badge from 'components/ui/Badge';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import { addToBasket } from 'actions/basketActions';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase/firebase';


const WishlistCard = ({ productId }) => {
	const dispatch = useDispatch();
	const [wishlistItem, setWishListItem] = useState(null);
	const uid = firebase.getUserId();
	const db = (firebase.getDBInstance());
	const [product, setProduct] = useState(null);
	const remove = () => {
		db.collection('users').doc(uid).set({ wishlist: firestore.FieldValue.arrayRemove(productId) }, { merge: true });
	};
	const onAddToBasket = () => {
		dispatch(addToBasket(product));
		remove();
		displayActionMessage('Item added to basket', 'success');
	};
	
	useEffect(() => {
		if (productId) {
			db.collection('products').doc(productId).get().then((docSnapshot) => {
				if (!docSnapshot.exists) {
					return;
				}
				setWishListItem(docSnapshot.data());
				setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
			});
		}
	}, []);

	return (
		<div className="basket-item">
			{
				wishlistItem ? <div className="basket-item-wrapper">
					<div className="basket-item-img-wrapper">
						<img className="basket-item-img"
							src={wishlistItem.image}
						/>
					</div>
					<div className="basket-item-details">
						<h5 className="basket-item-name">
							{wishlistItem.name}
						</h5>
						<h5 className="basket-item-price">
							{displayMoney(wishlistItem.price * wishlistItem.quantity)}
							<span>{` (x ${wishlistItem.quantity}) `}</span>
						
						</h5>
					</div>
					<div className="position-relative margin-right-l">
						<div className="position-relative margin-right-l">
							<Badge count={wishlistItem.quantity} />
					
						</div>
					</div>
					<button className="button button-small"
						onClick={onAddToBasket}
					>add to basket</button>
					<button
						className="basket-item-remove button button-border  button-border-gray button-small"
						onClick={() => {
							remove();
						}}
					>
					x
					</button>
				</div> : null
			}
			{/*  */}
			
		</div>
	);
};

export default WishlistCard;
