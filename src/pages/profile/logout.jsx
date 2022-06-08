import React from 'react';
import styles from './../common.module.css';
import { useSelector } from 'react-redux'; 
import { Redirect } from 'react-router-dom';

export function Logout() {

	const currentUser = useSelector(store => store.user.currentUser);
	const { requestInProgress, requestSuccess } = useSelector(store => store.user.logout);

console.log('Logout',requestInProgress, currentUser)

	if(!currentUser) {
		return <Redirect to = "/login" />;
	}

	if(requestInProgress) {
		return(
			<div className={styles.container}>
				<h1 className="text_type_main-medium">Выходим...</h1>
			</div>    
		);
	}

	return <Redirect to = "/" />;
	
}