import React, { Component } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './drag-element.module.css';
import PropTypes from 'prop-types';
import {ingredient} from "../../../types/index";

export default function DragElement(props) {
	function renderName (name, type) {
		if(type === 'top') {
			name = name + '\n(верх)';
		}
		if(type === 'bottom') {
			name = name + '\n(низ)';
		}
		return name;
	}

	return (
		<div className = {styles.container}>
			<div className = {styles.drag_icon}>
			  {(props.bunType === null) &&					
				  <DragIcon/>
			  }	
		  </div>          		
		  <ConstructorElement
			  type = {props.bunType}
			  text = {renderName(props.ingredient.name, props.bunType)}
			  thumbnail = {props.ingredient.image_mobile}
			  price = {props.ingredient.price}
			  isLocked = {props.bunType !== null}
		  />
		</div>
  )
}

DragElement.propTypes = {
	ingredient: ingredient,
	bunType: PropTypes.string
}
