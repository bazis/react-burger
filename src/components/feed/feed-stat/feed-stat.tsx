import styles from './feed-stat.module.css';
import { useSelector } from '../../../services/store';
import { OrderStatuses } from '../../../types';

export default function FeedStat() {

	const { ordersArray, 
		totalOrders, 
		totalOrdersToday } = useSelector(store => store.ws);  
        
    const readyOrders = ordersArray.filter((order) => order.status === OrderStatuses.done) 
    const pendingOrders = ordersArray.filter((order) => order.status === OrderStatuses.pending)   

	return (
		<div className = {styles.container}>
			<div className={styles.orderProgress}>
				<div className={styles.statusColumn}>
					<h3 className = "text text_type_main-medium mb-6">Готовы:</h3>
					<ul className={styles.orderNumbers}>
                        {readyOrders && readyOrders.map((order) => 
                            <li 
								className={`${styles.readyOrder} text text_type_digits-default pb-2 pr-6`} 
								key={order.number}>
                                	{order.number}
                            </li>       
                        )}
					</ul>
				</div>
                <div className = "ml-9">
					<h3 className = "text text_type_main-medium mb-6 ">В работе:</h3>
					<ul className={styles.orderNumbers}>
                        {pendingOrders && pendingOrders.map((order) => 
                            <li 
								className={`text text_type_digits-default pb-2 pr-6`} 
								key={order.number}>
                                	{order.number}
                            </li>       
                        )}
					</ul>
				</div>
			</div>
            
            <h3 className = "text text_type_main-medium mt-15">Выполнено за всё время:</h3>
            <p className="text text_type_digits-large">{totalOrders.toLocaleString()}</p>

            {totalOrdersToday && 
                <div>
                    <h3 className = "text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
                    <p className="text text_type_digits-large">{totalOrdersToday.toLocaleString()}</p>
                </div>
            }
           
		</div>
	)
}