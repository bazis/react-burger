import React, { useContext,  useState} from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import DragElement from './drag-element/drag-element';
import CartTotal from './cart-total/cart-total';
import styles from './burger-constructor.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { AppDataContext } from '../../services/app-data-context';
import { baseUrl } from '../../services/rest-api'; 
import { checkResponse } from '../../utils/check-response';


export default function BurgerConstructor() {	
	const orderPath = '/orders';
	
	const {state, setState} = useContext(AppDataContext);

	const [showModal, setShowModal] = useState(false);	

	const getOrderNumber = () => {
		if(state.cartIngredients) {
			fetch(baseUrl + orderPath, { 
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify( { "ingredients" : state.cartIngredients }) 
			})
				.then(checkResponse) 
				.then((res) => {				
					if(res && res.success) {
						setState({ ...state, orderNumber: res.order.number, orderStatus: "ok"}); 					 
					}else {
						setState({ ...state, orderStatus: "Ошибка при заказе"}); 			
					}
				})
				.catch((e) => {
					setState({ ...state, orderStatus: "Ошибка при заказе"}); 	
				})		
		}
		return 0;
	}

    const openModalWindow = () => {
		setShowModal(true);	
		getOrderNumber();	
    }
	const closeModalWindow = () => {
		setShowModal(false);
    }
	

	let bun = null,
		cartIngredients = [],
		cartTotal = 0;

	if (state.cartIngredients.length) {		
		cartIngredients = state.ingredientsAll.filter(ingr => state.cartIngredients.indexOf(ingr._id) !== -1);

		cartTotal = cartIngredients.reduce(
			(total, currentItem) => total + (currentItem.type === 'bun' ? currentItem.price * 2 : currentItem.price),
			0
		);


		//находим булку в ингридиентах
		bun = cartIngredients.find(ingr => ingr.type === 'bun');		
		if(bun) {
			//убираем булки из ингридиентов
			cartIngredients = cartIngredients.filter(ingr => ingr.type !== 'bun');
		}	
		
		//setState({ ...state, total: cartTotal }); //Тут уходит в бесконечную рекурсию
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
					{cartIngredients.map((ingredient, index) => (
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
					total = {cartTotal} 
					showOrderDetails = {openModalWindow}
				/>  
			</div>	

			{showModal && <Modal 
				visible = {showModal} 				
				onModalClose = {closeModalWindow}>
					<OrderDetails 
						orderNumber = {state.orderNumber} 
						orderStatus = {state.orderStatus}
					/>
			</Modal> }
		</>	
	)

}