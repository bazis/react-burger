import { TOrder, TIngredient, defaultIngredient } from '../../../types';
import OrderListItem from '../../order-list-item/order-list-item';
import styles from './feed-list.module.css';
import { useSelector } from '../../../services/store';

export default function FeedList() {

	const {
		ingredientsAll, 
		ingredientsRequestFailed, 
		ingredientsRequestInProgress} = useSelector((store) => store.ingredients);	

    let { ordersArray	} = useSelector(store => store.ws);    
    let OrdersWithFullIngredients: TOrder[] = [];

    if(ordersArray) {
       // ordersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))  //TODO не хочет так сортировать

        OrdersWithFullIngredients = ordersArray.map((order) => {

			const fullIngredients = order.ingredients.map((ingredientId) => {
					
				const fullIngredient = ingredientsAll.find((ingredient) => ingredient._id === ingredientId);
				return fullIngredient ? fullIngredient : defaultIngredient(ingredientId);
			});


			let fullOrder: TOrder = {
				_id: order._id,
				status: order.status,
				name: order.name,
				createdAt: order.createdAt,
				updatedAt: order.updatedAt,
				number: order.number,
				ingredients: fullIngredients
			}

			return fullOrder;
	    })
    }

	

	return (
		<>
			{ingredientsAll.length && OrdersWithFullIngredients.length ? (
				
				<ul className={styles.list}>
					{
						OrdersWithFullIngredients.map((item) => (
							<li key = {item._id}>
								<OrderListItem 
									orderObj={item}                           
								/>
							</li>
						))
					}
				</ul> 
				) : (
                    <h1 className='text text_type_main-large'>Нет заказов</h1>
                )
			}

			{ingredientsRequestFailed && <h1>Ошибка загрузки данных</h1> }
			{ingredientsRequestInProgress &&  <h1 className='text text_type_main-large'>Загрузка...</h1> }
		</>
	);
}