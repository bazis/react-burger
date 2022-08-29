import { TOrder, TIngredient } from '../../types';
import styles from './order-list-item.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";

export default function OrderListItem({orderObj}: {orderObj: TOrder}) {
	const location = useLocation();

	const maxIngredientsShow = 6;
	
	const totalCost = orderObj.ingredients.reduce((total: number, currentItem: TIngredient) => {		
		return currentItem ? total + (currentItem.type === 'bun' ? currentItem.price * 2 : currentItem.price) : 0;
	}, 0);

	const overflowCounter = (orderObj.ingredients.length > maxIngredientsShow) ? 
		orderObj.ingredients.length - maxIngredientsShow : 0;

	const orderIngredients = orderObj.ingredients.slice(0, maxIngredientsShow);
	
	
	//TODO сортировка с первой булкой
	//TODO сегодня вчера в дате
	const orderDate = new Date(orderObj.createdAt).toLocaleTimeString()

	return (
		<NavLink 
			to={{
				pathname: `${location.pathname}/${orderObj.number}`,
				state: {prevLocation: location}
			}}
			className={styles.orderLink}
		>
			<div className = {`${styles.container} p-6 mb-4 mr-2`}>
				<div className={`${styles.header}`}>
					<p className="text text_type_digits-default">#{orderObj.number}</p>
					<p className="text text_type_main-default text_color_inactive">{orderDate}</p>
				</div>
				<h2 className='text text_type_main-medium mt-6'>{orderObj.name}</h2>
				<div className={`${styles.bottom} mt-6`}>
					<ul className={`${styles.ingredients}`}>
						{
							orderIngredients.map((ingredient, index) => (
								<div className = {styles.imageContainer} key = {index}>
									<img className={styles.ingrImage} src={ingredient.image}/>
									{(index === 0 && overflowCounter) ? 
										<div className={`${styles.overflowCounter} text text_type_main-default`}>
											+{overflowCounter}
										</div> : null}
								</div>
							))
						}
					</ul>                
					<div className={styles.total}>
						<span className="text text_type_digits-default pr-1">{totalCost}</span>
						<CurrencyIcon type="primary"/>
					</div>
				</div>
			</div>
		</NavLink>	
	);
}