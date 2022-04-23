import React, { Component } from 'react';
import DragElement from './drag-element/drag-element';
import CartTotal from './cart-total/cart-total';
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { ingredient } from '../../types/index';

class BurgerConstructor extends Component {
    constructor (props) {
        super(props);

		//на входе среди массива ингридиентов должна быть булка.
		//Находим её и переносим в начало массива. И еще одну копию в конец
		if (this.props.cartIngredients) {
			this.state.cartIngredients = this.props.cartIngredients;

			const bun = this.state.cartIngredients.find(ingr => ingr.type === 'bun');
			if(bun) {
				this.state.cartIngredients = this.state.cartIngredients.filter(ingr => ingr.type !== 'bun');
			}			
			this.state.cartIngredients.unshift(bun);	
			const bottomBun = {...bun}			
			bottomBun._id = bun._id + '_bottom'; //TODO криво			
			this.state.cartIngredients.push(bottomBun);					
		}
    }

	state = {
		total: 610,
		cartIngredients: []
	}


    render() {
        return (
			<div className = {`${styles.container} pt-25 ml-10`}>
				<section className = {`${styles.drag_list} custom-scroll pr-2`}>
					{this.state.cartIngredients.map((ingredient, index) => (
						<DragElement 
							className = {styles.drag_element}							
							key = {ingredient._id}
							ingredient = {ingredient}
							bunType = {index === 0 ? 'top' : (index === this.state.cartIngredients.length - 1) ? 'bottom' : null}							
						/>      
					))}      
				</section>    
				<CartTotal total = {this.state.total}/>  
			</div>	
    	)
  	}
}

BurgerConstructor.propTypes = {
	cartIngredients: PropTypes.arrayOf(ingredient).isRequired
}

export default BurgerConstructor;