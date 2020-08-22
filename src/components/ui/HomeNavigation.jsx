import React from 'react';
import { NavLink } from 'react-router-dom';
import { storage } from "firebase";



class HomeNavigation extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             category:{}
        }
    }
    

    componentDidMount(){
        storage.collection('products')
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                var category = doc.data()
                this.setState({
                    category
                })
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
    });

        
    }

	render(){
        return (
            <aside className="sidenavigation">
                <div className="sidenavigation-wrapper">
                    Categories
                    <div className="sidenavigation-item">
                        <NavLink
                            activeClassName="sidenavigation-menu-active"
                            className="sidenavigation-menu"
                        >
                            {this.state.category}
                        </NavLink>
                    </div>
                </div>
            </aside>
        );
    }
};

export default HomeNavigation;
