import React, {useEffect, useState} from 'react';
import firebase from '../../../firebase/firebase';
import { firestore } from 'firebase';
import Badge from 'components/ui/Badge';
import { displayMoney } from 'helpers/utils';


const WishlistCard = ({productId}) => {

	const [wishlistItem, setWishListItem] = useState(null);

	const uid = firebase.getUserId();
	const db =  (firebase.getDBInstance());
	useEffect(() => {
		if(productId){

		db.collection('products').doc(productId).get().then(docSnapshot => {
			if(!docSnapshot.exists){
				console.log('no document');
				return;
			}
			setWishListItem(docSnapshot.data())
		})
		}
	}, [])

	return (
		<div className="basket-item">
			{
				wishlistItem ? <div className="basket-item-wrapper">
				<div className="basket-item-img-wrapper">
					<img src={wishlistItem.image} className='basket-item-img'></img>
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
				<button
					className="basket-item-remove button button-border  button-border-gray button-small"
					onClick={() => {
						db.collection("users").doc(uid).set({wishlist: firestore.FieldValue.arrayRemove(productId)}, {merge: true})

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
