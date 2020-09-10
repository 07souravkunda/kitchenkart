import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../ui/ImageLoader';

const UserItem = (props) => {
	const { user } = props;
	//   console.log(user, user.get('email'));
	let email; let name; let image; let role; let 
		datejoined;
	if (props.email) {
		name = user.get('fullname');
		image = user.get('avatar');
		email = user.get('email');
		role = user.get('role');
		datejoined = user.get('dateJoined');
		console.log(datejoined);
	}
	if (role === 'ADMIN') return null;
	return (
		<SkeletonTheme color="#e1e1e1"
			highlightColor="#FFFFFF"
		>
			<div className="grid grid-product grid-count-4">
				<div className="grid-col">
					{/* <div className="product-card-img-wrapper"> */}
					{image ? (
						<ImageLoader className="user-profile-img1"
							src={image}
						/>
					) : (
						<Skeleton height={'90%'}
							width={'100%'}
						/>
					)}
					{/* </div> */}
				</div>
				<div className="grid-col">
					<h5>{name || <Skeleton width={80} />}</h5>
				</div>
				<div className="grid-col">
					<h5>{email || <Skeleton width={80} />}</h5>
				</div>

				<div className="grid-col">
					<h5>{datejoined || <Skeleton width={80} />}</h5>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default UserItem;
