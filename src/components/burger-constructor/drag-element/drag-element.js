import React, { Component } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './drag-element.module.css';
import PropTypes from 'prop-types';
import {ingredient} from "../../../types/index";

export default function DragElement(props) {	

	return (
		<div className = {styles.container}>
			<div className = {styles.drag_icon}>			  
				<DragIcon/>			  
		  	</div>          		
		  	<ConstructorElement			
			  	text = {props.ingredient.name}
			  	thumbnail = {props.ingredient.image_mobile}
			  	price = {props.ingredient.price}
			  	isLocked = {false}
		  	/>
		</div>
  	)
}

DragElement.propTypes = {
	ingredient: ingredient	
}
