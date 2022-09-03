import React, { Component } from 'react'
import styles from './cart-total.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/store';
import { TIngredientCart } from '../../../types';


export default function CartTotal(props: {total: number, showOrderDetails: () => void}) {

	let cartIngredients = useSelector((store) => store.cart.cartIngredients) || [];

	return (
		<div className = {`${styles.container} mt-10`}>
			<div className = "text_type_digits-medium mr-2">
				{props.total}				
			</div>
			<div className = {styles.currency}>
				<CurrencyIcon type = "primary"/>
			</div>			
			<div className = "pl-10">
				{ cartIngredients.some((item: TIngredientCart) => item.type === 'bun') ? (
					<Button  
						type = "primary" 
						size = "large"
						onClick = {props.showOrderDetails}>
							Оформить заказ
					</Button>
				) : (null) }	
			</div>
		</div>
	)
}
