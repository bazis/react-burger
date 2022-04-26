import React, { Component } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
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

	let bun = null;

	if (props.cartIngredients.length) {	
		state.cartIngredients = props.cartIngredients;

		//находим булку в ингридиентах
		bun = state.cartIngredients.find(ingr => ingr.type === 'bun');		
		if(bun) {
			//убираем булки из ингридиентов
			state.cartIngredients = state.cartIngredients.filter(ingr => ingr.type !== 'bun');
		}									
	}		

	return (
		<>
			<div className = {`${styles.container} pt-25 ml-10`}>
				{bun && <div className = {styles.bun}>
							<ConstructorElement
								type = "top"
								text={`${bun.name}\n(верх)`}
								thumbnail = {bun.image_mobile}
								price = {bun.price}
								isLocked = {true}														
							/>
						</div> }

				<section className = {`${styles.drag_list} custom-scroll pr-2 mt-4 mb-4`}>
					{state.cartIngredients.map((ingredient, index) => (
						<DragElement 
							className = {styles.drag_element}							
							key = {ingredient._id}
							ingredient = {ingredient}							
						/>      
					))}      
				</section>    

				{bun && <div className = {styles.bun}>
							<ConstructorElement
								type = "bottom"
								text={`${bun.name}\n(низ)`}
								thumbnail = {bun.image_mobile}
								price = {bun.price}
								isLocked = {true}														
							/>
						</div> }

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
