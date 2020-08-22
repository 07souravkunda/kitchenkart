import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase/firebase';
import WishlistCard from './WishlistCard';


// Just add this feature if you want :

const UserWishListTab = (props) => {

	const [wishLists, setWishList] = useState(null);
	
	useEffect(() => {
		const db =  (firebase.getDBInstance());
		const uid = firebase.getUserId();

		db.collection("users").doc(uid).onSnapshot(docSnapshot => {
		   if(!docSnapshot.exists){
			   // Nothing message
			   return;
		   }
		//    const wishlist=(docSnapshot.get.map(d => d.get("wishlist")).filter(d => !!d));
		   setWishList(docSnapshot.get("wishlist"));
		   console.log(docSnapshot.get("wishlist"));
		   

		//    setCategories(docSnapshotList.docs.map(d => d).filter(d => !!d))
		   
	   })

	   return () => {
		   // cleanup function
		   console.log("Unmounted");
	   }  
	} ,[])
	return(
		<div>
			{
				wishLists ? wishLists.map(productId =>
					<WishlistCard productId={productId} key={productId} />
					) : null
			}
		</div>
	)
};



export default UserWishListTab;
