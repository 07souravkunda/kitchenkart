import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter, applyFilter } from 'actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';
import firebase from '../../firebase/firebase';


const Filters = (props) => {
	const [isMounted, setMounted] = useState(false);
	const [field, setFilter] = useState({
		brand: props.filter.brand,
		category: props.filter.category,
		minPrice: props.filter.minPrice,
		maxPrice: props.filter.maxPrice,
		sortBy: props.filter.sortBy
	});


	const dispatch = useDispatch();
	const max = selectMax(props.products);
	const min = selectMin(props.products);

	useEffect(() => {
		if (isMounted && window.screen.width <= 480) {
			props.history.push('/');
		}

		if (isMounted && props.closeModal) props.closeModal();

		setFilter(props.filter);
		setMounted(true);
		window.scrollTo(0, 0);
	}, [props.filter]);

	const [categories, setCategories] = useState([]);


	const onCategoryFilterChange = (e) => {
		const val = e.target.value;

		setFilter({ ...field, category: val });
	};

	useEffect(() => {
		const db = (firebase.getDBInstance());

		 db.collection('products').get().then((docSnapshotList) => {
			if (docSnapshotList.empty) {
				// Nothing message
				return;
			}
			const cat = [...new Set(docSnapshotList.docs.map(d => d.get('category')))];
			setCategories(cat);
		}).catch(err => console.error(err));

		return () => {
			// cleanup function
			console.log('Unmounted');
		};
	}, []);
	

	const onApplyFilter = () => {
		const isChanged = Object.keys(field).some(key => field[key] !== props.filter[key]);

		if (field.minPrice > field.maxPrice) {
			return false;
		}

		if (isChanged) {
			dispatch(applyFilter(field));
		} else {
			props.closeModal();
		}
	};

	const onResetFilter = () => {
		const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy', 'category'];

		if (filterFields.some(key => !!props.filter[key])) {
			dispatch(resetFilter());
		} else {
			props.closeModal();
		}
	};
	console.log(window.location);

	return (
		<div className="filters">				
			<div className="filters-field">
				 <h1>Category</h1>
				<br />
				<br />
				{props.productsLength === 0 && props.isLoading ? (
					<h5 className="text-subtle">Loading Filter</h5>
				) : (
					<select 
						className="filters-brand"
						disabled={props.isLoading || props.productsLength === 0}
						onChange={onCategoryFilterChange}
						style={{ width: '100%' }}
						value={field.category}
					>
						<option value="">All Categories</option>
						{		
							categories.map(c => <option key={c}
								value={c.toLowerCase()}
							                    >{c}</option>)
						}
							
					</select>
				)}
			</div>
			<div className="filters-action"
				style={window.innerWidth < 500 ? { flexDirection: 'column' } : {}}
			
			>
				<button
					className="filters-button button button-small"
					disabled={props.isLoading || props.productsLength === 0}
					onClick={onApplyFilter}
					style={window.innerWidth < 500 ? { width: '50%' } : {}}
				>
					Apply filters
				</button>
				<button
					className="filters-button button button-border button-small"
					disabled={props.isLoading || props.productsLength === 0}
					onClick={onResetFilter}
					style={window.innerWidth < 500 ? { width: '50%' } : {}}
				>
					Reset filters
				</button>
			</div>
		</div>
	);
};

export default withRouter(Filters);
