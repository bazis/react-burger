import React from 'react';
import IngredientDetails from '../components/ingredients-details/ingredients-details';
import styles from './common.module.css';

export function IngredientPage() {

	return (
		<div className={styles.container}>
			<h1 className={`${styles.header} text text_type_main-large`}>
				Детали ингредиента
			</h1>
			<IngredientDetails />
		</div>
	)
	
}