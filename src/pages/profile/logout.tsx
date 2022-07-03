import React from 'react';
import styles from './../common.module.css';
import { useSelector } from 'react-redux'; 
import { Redirect } from 'react-router-dom';

export function Logout() {

	const currentUserEmail = useSelector((store: any) => store.user.currentUser.email);
	const { requestInProgress, requestSuccess } = useSelector((store: any) => store.user.logout);

	if(!currentUserEmail) {
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