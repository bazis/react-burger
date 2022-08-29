import React, { useEffect } from 'react';
import FeedList from '../components/feed/feed-list/feed-list';
import FeedStat from '../components/feed/feed-stat/feed-stat';
import styles from './feed-page.module.css';
import { useDispatch, useSelector, wsUrlAllOrders } from '../services/store';
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from '../services/actions/wsActions';


export function FeedPage() {

	const dispatch = useDispatch();
	const { wsConnected } = useSelector(store => store.ws);

	useEffect(() => {
		if(!wsConnected) {
			console.log('dispatch WS_CONNECTION_START ')
			dispatch({
				type: WS_CONNECTION_START,
				payload: {
					wsUrl: wsUrlAllOrders
				}
			})		
		}	
		
		return () => {
			console.log('dispatch WS_CONNECTION_STOP ')
			dispatch({type: WS_CONNECTION_STOP})
		}
	}, [dispatch])

	return(
		<>            
			<div className={styles.container}>
				<div className={styles.centerContainer}>				
					<h1 className='text text_type_main-large pt-10 pb-10 pl-4'>Лента заказов</h1>
					<div className={styles.ordersContainer}>                
						<div className={`${styles.feedContainer} custom-scroll`}>						
							<FeedList/>
						</div>       

						<div className={`${styles.statContainer} ml-15`}>
							<FeedStat/>
						</div>    
					</div>    
				</div>
			</div>
		</>
	);

}