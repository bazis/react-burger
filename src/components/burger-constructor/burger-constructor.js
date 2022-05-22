import React, { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import DragElement from './drag-element/drag-element';
import CartTotal from './cart-total/cart-total';
import styles from './burger-constructor.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../services/actions/cart';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/cart';


export default function BurgerConstructor() {	
	
	
	const [showModal, setShowModal] = useState(false);	

	let cartIngredients = useSelector(store => store.cart.cartIngredients) || [];
	const order = useSelector(store => store.cart.order) || {number: 0};

	const dispatch = useDispatch();

    const openModalWindow = () => {
		setShowModal(true);			
		dispatch(placeOrder(cartIngredients));	
    }
	const closeModalWindow = () => {
		setShowModal(false);
    }

	const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
			dispatch(addIngredient(ingredient));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });


    const borderColor = isHover ? 'lightgreen' : 'transparent';
	

	let bun = null,		
		cartTotal = 0,
		cartIngredientsWithoutBun = [];

	if (cartIngredients.length) {				

		cartTotal = cartIngredients.reduce(
			(total, currentItem) => total + (currentItem.type === 'bun' ? currentItem.price * 2 : currentItem.price),
			0
		);

		//находим булку в ингридиентах
		bun = cartIngredients.find(ingr => ingr.type === 'bun');		
		
		//остальные ингридиенты
		cartIngredientsWithoutBun = cartIngredients.filter(ingr => ingr.type !== 'bun');
							
	}		

	return (
		<>
			<div className = {`${styles.container} pt-25 ml-10`}>
				<div className = {styles.dropTarget} style={{borderColor}} ref={dropTarget}>
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
						{cartIngredientsWithoutBun.map((ingredient, index) => (
							<DragElement 
								className = {styles.drag_element}							
								key = {ingredient.uuid}
								ingredient = {ingredient}
								index = {index}				
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
				</div>		

				{cartTotal !== 0 ? (<CartTotal 
					total = {cartTotal} 
					showOrderDetails = {openModalWindow}
				/>) : (<h3>Тяни сюда</h3>)}
			</div>	

			{showModal && <Modal 
				visible = {showModal} 				
				onModalClose = {closeModalWindow}>
					<OrderDetails 
						orderNumber = {order.number} 
						orderStatus = {order.textStatus}
					/>
			</Modal> }
		</>	
	)

}