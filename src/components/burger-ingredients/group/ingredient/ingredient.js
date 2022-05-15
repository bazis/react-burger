import React, { useMemo } from 'react'
import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredient } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_INGREDIENT_DETAILS } from '../../../../services/actions/ingredients';
import { useDrag } from 'react-dnd';


export default function Ingredient(props) {

	const dispatch = useDispatch();	

    const openModalWindow = () => {	
		dispatch({
			type: SHOW_INGREDIENT_DETAILS,
			payload: props.ingredientObj
		});
    }

	const cartIngredients = useSelector(store => store.cart.cartIngredients) || [];

	let amount = cartIngredients.filter(item => item._id === props.ingredientObj._id).length;
	if (props.ingredientObj.type === 'bun') {
		amount *= 2;
	}
	
	const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: props.ingredientObj,
        collect: monitor => ({
			opacity: monitor.isDragging() ? 0.2 : 1
        })
    });

	return (
		<div className = {styles.container} onClick={openModalWindow} ref={dragRef} style={{opacity}} >
			{amount > 0 && <Counter count={amount} size="default" />} 			
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
			
	)
}

Ingredient.propTypes = {
	ingredientObj: ingredient
}

