import React, {FC} from 'react'
import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../../types';
import { useSelector } from '../../../../services/store';
import { useDrag } from 'react-dnd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


export default function Ingredient({ingredientObj}: {ingredientObj: TIngredient}) {

	const cartIngredients = useSelector((store) => store.cart.cartIngredients) || [];
	const location = useLocation();

	let amount = cartIngredients.filter((item: TIngredient) => item._id === ingredientObj._id).length;
	if (ingredientObj.type === 'bun') {
		amount *= 2;
	}
	
	const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: ingredientObj,
        collect: monitor => ({
			opacity: monitor.isDragging() ? 0.2 : 1
        })
    });

	return (		
		<div className = {styles.container} ref={dragRef} style={{opacity}} >
			<Link
				className={styles.link}
				to={{
					pathname: `/ingredients/${ingredientObj._id}`,
					state: {prevLocation: location}
				}}
			>
				{amount > 0 && <Counter count={amount} size="default" />} 			
				<img className = {styles.image} src={ingredientObj.image} alt={ingredientObj.name}/>
				<div className = {styles.price}>
					<span className = "text_type_digits-default pr-1">
						{ingredientObj.price}
					</span>
					<CurrencyIcon type = "primary"/>
				</div>
				<div className = {`${styles.itemName} text_type_main-default`}>
					{ingredientObj.name}							
				</div>
			</Link>		
		</div>	
		
	)
}
