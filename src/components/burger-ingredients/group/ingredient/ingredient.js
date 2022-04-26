import React, { Component } from 'react'
import styles from './ingredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientDetails from '../../../ingredients-details/ingredients-details';
import Modal from '../../../modal/modal';
import { ingredient } from '../../../../types';

export default function Ingredient(props) {

	const [showModal, setShowModal] = React.useState(false);

    const openModalWindow = () => {
		setShowModal(true);
    }
	const closeModalWindow = () => {
		setShowModal(false);
    }

	return (
		<>
			<div className = {styles.container} onClick={openModalWindow}>
				<img className = {styles.image} src={props.image} alt={props.name}/>
				<div className = {styles.price}>
					<span className = "text_type_digits-default pr-1">
						{props.price}
					</span>
					<CurrencyIcon type = "primary"/> {/* TODO выровнять по вертикали*/}
				</div>
				<div className = {`${styles.itemName} text_type_main-default`}>
					{props.name}
				</div>
			</div>
			
			<Modal 
				visible = {showModal} 
				title = "Детали ингридиента"
				onModalClose = {closeModalWindow}>
					<IngredientDetails {...props} />
			</Modal> 
		</>	
	)
}

Ingredient.propTypes = {
	props: ingredient
}

