import React, { Component } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './drag-element.module.css';


class DragElement extends Component {
  	render() {
    	return (
      		<div className = {styles.container}>
				<div className = {styles.drag_icon}>
					<DragIcon/>
				</div>          		
				<ConstructorElement
					type = {this.props.ingredient.type === 'bun' ? 'top': ''}
					text = {this.props.ingredient.name}
					thumbnail = {this.props.ingredient.image_mobile}
					price = {this.props.ingredient.price}
				/>
          	</div>
    	)
  	}
}

export default DragElement;