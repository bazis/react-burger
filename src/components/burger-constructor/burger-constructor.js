import React, { Component } from 'react';
import DragElement from './drag-element/drag-element';
import CartTotal from './cart-total/cart-total';
import styles from './burger-constructor.module.css'

class BurgerConstructor extends Component {
    constructor (props) {
        super(props);
    }

	state = {
		total: 610
	}

    render() {
        return (
			<div className = {`${styles.container} pt-25 ml-10`}>
				<section className = {styles.drag_list}>
					{this.props.cartIngredients.map((ingredient, index) => (
						<DragElement 
							className = {styles.drag_element}							
							key = {ingredient._id}
							ingredient = {ingredient}
						/>      
					))}      
				</section>    
				<CartTotal total = {this.state.total}/>  
			</div>	
    	)
  	}
}

export default BurgerConstructor;