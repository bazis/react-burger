import React, {useEffect, useState} from 'react';
import { TWsOrder, TIngredient, defaultIngredient, OrderStatuses } from '../../types';
import { baseUrl } from '../../services/rest-api';
import { checkResponse } from '../../utils/api';
import { useParams } from 'react-router';
import styles from './order-info.module.css';
import { useSelector } from '../../services/store';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from '../../utils/date';

export default function OrderInfo() {
	const { orderNumber }: {orderNumber: string}  = useParams();
	const [order, setOrder] = useState<TWsOrder>();
	const [loadingError, setLoadingError] = useState('');

	const { ingredientsAll } = useSelector((store) => store.ingredients);	

	const orderPath = '/orders/' + orderNumber;	
	let orderStatus = 'Неизвестно',
		fullIngredients: TIngredient[] = [],
		countIngredients: { [key: string]: { ingredient: TIngredient; quantity: number } } = {},
		totalCost = 0,
        orderDate = '';

	useEffect(() => {		
		const getOrder = () => {
			fetch(baseUrl + orderPath)
				.then(checkResponse) 
				.then((res) => {
					if(res && res.success) {
						if(res.orders && res.orders[0]) {
							setOrder(res.orders[0]);     
						}else {
							setLoadingError('Ошибка при загрузке');
						}						
					}else {
						setLoadingError('Ошибка при загрузке');
					}
				})
				.catch((e) => {
					setLoadingError('Ошибка при загрузке');
				})	
		}
		getOrder();		
	}, []);

	if(order && ingredientsAll) {
		fullIngredients = order.ingredients.map((ingredientId) => {					
			const fullIngredient = ingredientsAll.find((ingredient) => ingredient._id === ingredientId);

			if(typeof countIngredients[ingredientId] !== 'undefined' && fullIngredient) {
				countIngredients[ingredientId].quantity++;
			}else if (fullIngredient) {
				countIngredients[ingredientId] = {
					ingredient: fullIngredient,
					quantity: fullIngredient.type === 'bun' ? 2 : 1
				}
			}

			return fullIngredient ? fullIngredient : defaultIngredient(ingredientId);

		});		

		
		if(order.status === OrderStatuses.done) {
			orderStatus = 'Выполнен';
		}else if(order.status === OrderStatuses.pending){
			orderStatus = 'Готовится';
		}else if(order.status === OrderStatuses.created){
			orderStatus = 'Создан';
		}

		orderDate = formatDate(order.createdAt)

		totalCost = fullIngredients.reduce((total: number, currentItem) => {		
			return currentItem ? total + (currentItem.type === 'bun' ? currentItem.price * 2 : currentItem.price) : 0;
		}, 0);

	}
   

	return (
		order ? (
			<div className = {styles.container}>
				<h3 className={`${styles.orderNumber} text text_type_digits-default`}>#{order.number}</h3>
				<h2 className='text text_type_main-medium mt-10'>{order.name}</h2>
				<p className={`${order.status === OrderStatuses.done ? styles.readyOrder: null} text text text_type_main-small mt-3`}>{orderStatus}</p>
				<h4 className="text text_type_main-medium mt-15">Состав:</h4>
				{
					<ul className={`${styles.ingredientList} mt-6 custom-scroll`}>
						{
							Object.values(countIngredients).map((item) => (
								<li className={`${styles.ingredientRow} mt-4`} key={item.ingredient._id}>
									<img className={styles.ingrImage} src={item.ingredient.image} alt={item.ingredient.name}/>
									<div className={`${styles.titlePriceContainer} pr-6`}>
										<p className="text text text_type_main-small pl-4">{item.ingredient.name}</p>
										<div className={styles.price}>
											<span className="text text_type_digits-default pr-1">{item.quantity} x {item.ingredient.price}</span>
											<CurrencyIcon type="primary"/>
										</div>

									</div>
								</li>							
							))
						}
					</ul>
				}
				<div className={`${styles.bottom} mt-10`}>
					<p className="text text_type_main-default text_color_inactive">{orderDate}</p>
					<div className={styles.total}>
						<span className="text text_type_digits-default pr-1">{totalCost}</span>
						<CurrencyIcon type="primary"/>
					</div>
				</div>
			</div> 
		) : (
			loadingError ? <h1> {loadingError} </h1> : <h1 className='text text_type_main-large'> Загрузка...</h1>
		)
	);
}