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
				<img className = {styles.image} src={props.ingredientObj.image} alt={props.ingredientObj.name}/>
				<div className = {styles.price}>
					<span className = "text_type_digits-default pr-1">
						{props.ingredientObj.price}
					</span>
					<CurrencyIcon type = "primary"/> {/* TODO выровнять по вертикали*/}
				</div>
				<div className = {`${styles.itemName} text_type_main-default`}>
					{props.ingredientObj.name}
				</div>
			</div>
			
			<Modal 
				visible = {showModal} 
				title = "Детали ингридиента"
				onModalClose = {closeModalWindow}>
					<IngredientDetails ingredientObj = {props.ingredientObj} />
			</Modal> 
		</>	
	)
}

Ingredient.propTypes = {
	ingredientObj: ingredient
}

