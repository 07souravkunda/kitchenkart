import React, { useEffect, useState } from 'react';
import Boundary from 'components/ui/Boundary';
import firebase from '../../../firebase/firebase';
import UserItem from 'components/users/userItem';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    firebase.db.collection('users').onSnapshot((snap) => {
      console.log(snap.docs);
      setUsers(snap.docs);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  //   if (users.length === 0) return null;
  return (
    <Boundary>
      <div className="product-admin-header">
        <h3 className="product-admin-header-title">
          Users &nbsp;
          {/* ({`${store.productsLength} / ${store.totalItems}`}) */}
        </h3>
      </div>
      <div className="product-admin-items">
        <div className="grid grid-product grid-count-4">
          <div className="grid-col"></div>
          <div className="grid-col">
            <h5>Name</h5>
          </div>
          <div className="grid-col">
            <h5>email</h5>
          </div>
          <div className="grid-col">
            <h5>Date Added</h5>
          </div>
        </div>
        {users.length === 0
          ? new Array(10)
              .fill({})
              .map((user, index) => (
                <UserItem key={`product-skeleton ${index}`} user={user} />
              ))
          : users.map((el) => {
              console.log(el.get('email'));
              return (
                <UserItem
                  key={el.get('email')}
                  user={el}
                  email={el.get('email')}
                />
              );
            })}
      </div>
    </Boundary>
  );
};

export default Users;
