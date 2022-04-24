import React, { Component } from 'react';
import DragElement from './drag-element/drag-element';
import CartTotal from './cart-total/cart-total';
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { ingredient } from '../../types/index';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


export default function BurgerConstructor(props) {

	const [state, setState] = React.useState({
		total: 610,
		cartIngredients: []
	});

	const [showModal, setShowModal] = React.useState(false);

    const openModalWindow = () => {
		setShowModal(true);
    }
	const closeModalWindow = () => {
		setShowModal(false);
    }
	const getOrderNumber = () => {
		//тут будет POST
		return 435345436;
	}

	if (props.cartIngredients.length) {	
		state.cartIngredients = props.cartIngredients;

		const bun = state.cartIngredients.find(ingr => ingr.type === 'bun');
		if(bun) {
			state.cartIngredients = state.cartIngredients.filter(ingr => ingr.type !== 'bun');
		}			
		state.cartIngredients.unshift(bun);	
		const bottomBun = {...bun}			
		bottomBun._id = bun._id + '_bottom'; //TODO криво			
		state.cartIngredients.push(bottomBun);					
	}

	return (
		<>
			<div className = {`${styles.container} pt-25 ml-10`}>
				<section className = {`${styles.drag_list} custom-scroll pr-2`}>
					{state.cartIngredients.map((ingredient, index) => (
						<DragElement 
							className = {styles.drag_element}							
							key = {ingredient._id}
							ingredient = {ingredient}
							bunType = {index === 0 ? 'top' : (index === state.cartIngredients.length - 1) ? 'bottom' : null}							
						/>      
					))}      
				</section>    
				<CartTotal 
					total = {state.total} 
					showOrderDetails = {openModalWindow}
				/>  
			</div>	

			<Modal 
				visible = {showModal} 				
				onModalClose = {closeModalWindow}>
					<OrderDetails orderNumber = {getOrderNumber()} />
			</Modal> 
		</>	
	)

}


BurgerConstructor.propTypes = {
	cartIngredients: PropTypes.arrayOf(ingredient).isRequired
}
