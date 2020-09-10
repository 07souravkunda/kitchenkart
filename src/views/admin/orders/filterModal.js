import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';

const FilterModal = (props) => {
	const [status, setStatus] = useState(props.filters.status);
	const [mode, setMode] = useState(props.filters.mode);
	const [name, setName] = useState(props.filters.name);
	const [email, setEmail] = useState(props.filters.email);
	const [date, setDate] = useState(props.filters.createdAt);
	return 	<Modal
		isOpen={props.isOpenModal}
		onRequestClose={props.onCloseModal}
		overrideStyle={{ padding: '10px', width: window.innerWidth > 400 ? '50%' : '80%' }}
	        >
		<div className="filter">
			<div className="filters-field">
				<span>status</span>
				<br />
				<br />
				<select className="filters-brand"
					onChange={e => setStatus(e.target.value)}
					value={status}
				>
					<option value="all">all</option>
					<option value="ordered">ordered</option>
					<option value="shipped">shipped</option>
					<option value="delivered">delivered</option>
					<option value="canceled">canceled</option>
				</select>
			</div>
			<div className="filters-field">
				<span>payment method</span>
				<br />
				<br />
				<select className="filters-brand"
					onChange={e => setMode(e.target.value)}
					value={mode}
				>
					<option value="all">all</option>

					<option value="COD">COD</option>
					<option value="credit">credit</option>
				
				</select>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<span>name</span>
					<br />
					<br />
					<input onChange={e => setName(e.target.value)}
						placeholder="enter customer name"
						value={name}
					/>
				</div>
				<div>
					<span>email</span>
					<br />
					<br />
					<input onChange={e => setEmail(e.target.value)}
						placeholder="enter customer email"
						value={email}
					/>
				</div>
				<div>
					<span>order date</span>
					<br />
					<br />
					<input onChange={e => setDate(e.target.value)}
						placeholder="enter customer email"
						type="date"
					/>
				</div>
			</div>
			<br />
			<div className="filters-action">
				<button
					className="filters-button button button-small"
					// disabled={props.isLoading || props.productsLength === 0}
					onClick={() => props.applyFilter({
						mode, status, name, email, createdAt: date 
					})}
				>
					Apply filters
				</button>
				<button
					className="filters-button button button-border button-small"
					// disabled={props.isLoading || props.productsLength === 0}
					onClick={() => {
						setEmail(''); setName(''); setMode('all'); setStatus('all'); props.applyFilter({
							email: '', mode: 'all', name: '', status: 'all', createdAt: '' 
						}); 
					}}
				>
					Reset filters
				</button>
			</div>
		</div>
		<button className="modal-close-button"
			onClick={props.onCloseModal}
		>
			<i className="fa fa-times-circle" />
		</button>
	</Modal>;
};

export default FilterModal;
