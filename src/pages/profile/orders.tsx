import React, { useEffect } from 'react';
import FeedList from '../../components/feed/feed-list/feed-list';
import styles from './orders.module.css';
import { useDispatch, useSelector, wsUrlMyOrders } from '../../services/store';
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from '../../services/actions/wsActions';


export function Orders() {

	const dispatch = useDispatch();
	const { wsConnected } = useSelector(store => store.ws);

	useEffect(() => {
		if(!wsConnected) {
			console.log('dispatch WS_CONNECTION_START ')

			let accessToken = localStorage.getItem('accessToken');
			if(accessToken) {
				dispatch({
					type: WS_CONNECTION_START,
					payload: {
						wsUrl: wsUrlMyOrders,
						token: accessToken.replace('Bearer ', '')
					}
				})		
			}			
		}	
		
		return () => {
			console.log('dispatch WS_CONNECTION_STOP ')
			dispatch({type: WS_CONNECTION_STOP})
		}
	}, [dispatch])

	return(
		<>            
			<div className={`${styles.container} custom-scroll`}>
				<FeedList/> 
			</div>
		</>
	);

}