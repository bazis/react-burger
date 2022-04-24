import React, { Component } from 'react'
import styles from './cart-total.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


export default function CartTotal(props) {
	return (
		<div className = {`${styles.container} mt-10`}>
			<div className = "text_type_digits-medium mr-2">
				{props.total}				
			</div>
			<div className = {styles.currency}>
				<CurrencyIcon type = "primary"/>
			</div>			
			<div className = "pl-10">
				<Button  
					type = "primary" 
					size = "large"
					onClick = {props.showOrderDetails}>
						Оформить заказ
				</Button>
			</div>
		</div>
	)
}

CartTotal.propTypes = {
	total: PropTypes.number.isRequired
}
