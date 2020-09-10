import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase/firebase';
import WishlistCard from './WishlistCard';


// Just add this feature if you want :

const UserWishListTab = (props) => {
	const [wishLists, setWishList] = useState(null);
	
	useEffect(() => {
		const db = (firebase.getDBInstance());
		const uid = firebase.getUserId();

		db.collection('users').doc(uid).onSnapshot((docSnapshot) => {
		   if (!docSnapshot.exists) {
			   // Nothing message
			   return;
		   }
			//    const wishlist=(docSnapshot.get.map(d => d.get("wishlist")).filter(d => !!d));
		   setWishList(docSnapshot.get('wishlist'));
		   

			//    setCategories(docSnapshotList.docs.map(d => d).filter(d => !!d))
	   });

	   return () => {
		   // cleanup function
		  
	   };  
	}, []);
	return (
		<div>
			{
				wishLists ? wishLists.map(productId => <WishlistCard key={productId}
					productId={productId}
				                                       />) : null
			}
			{!wishLists ? <p>No products added yet</p> : null}
		</div>
	);
};


export default UserWishListTab;
