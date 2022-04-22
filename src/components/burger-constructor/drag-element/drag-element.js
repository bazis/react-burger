import React, { Component } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './drag-element.module.css';


class DragElement extends Component {
	constructor(props) {
		super(props);
	}

  	render() {
    	return (
      		<div className = {styles.container}>
				  <div className = {styles.drag_icon}>
					{(this.props.bunType === null) &&					
						<DragIcon/>
					}	
				</div>          		
				<ConstructorElement
					type = {this.props.bunType}
					text = {this.props.ingredient.name}
					thumbnail = {this.props.ingredient.image_mobile}
					price = {this.props.ingredient.price}
				/>
          	</div>
    	)
  	}
}

export default DragElement;