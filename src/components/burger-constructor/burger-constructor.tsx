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
import { useHistory } from 'react-router-dom';
import { TIngredientCart } from '../../types';


export default function BurgerConstructor() {	
	
	
	const [showModal, setShowModal] = useState(false);	

	let cartIngredients: TIngredientCart[] = useSelector((store: any) => store.cart.cartIngredients) || [];
	const order: any = useSelector((store: any) => store.cart.order) || {number: 0};
	const currentUserEmail: any = useSelector((store: any) => store.user.currentUser.email);

	const dispatch = useDispatch();
	const history = useHistory();

    const openModalWindow = () => {
		if(!currentUserEmail) {
			history.replace({
				pathname: '/login'
			});
			return;
		}

		setShowModal(true);			
		dispatch(placeOrder(cartIngredients));	
    }
	const closeModalWindow = () => {
		setShowModal(false);
    }

	const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient: TIngredientCart) {
			dispatch(addIngredient(ingredient));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });


    const borderColor = isHover ? 'lightgreen' : 'transparent';
	

	let bun = null,		
		cartTotal = 0,
		cartIngredientsWithoutBun: TIngredientCart[] = [];

	if (cartIngredients.length) {				

		cartTotal = cartIngredients.reduce(
			(total: number, currentItem: TIngredientCart) => total + (currentItem.type === 'bun' ? currentItem.price * 2 : currentItem.price),
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
				onModalClose = {closeModalWindow}>
					<OrderDetails 
						orderNumber = {order.number} 
						orderStatus = {order.textStatus}
					/>
			</Modal> }
		</>	
	)

}