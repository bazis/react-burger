import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {useDispatch, useSelector} from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredients } from '../../services/actions/ingredients';


export default function App() {
	
	// const initialState =  {
	// 	activePage: 'Конструктор',
	// 	ingredientsAll: [],		
	// 	cartIngredients: [],
	// 	ingredientsLoadError: false,
	// 	order: {
	// 		number: 0,
	// 		status: 'Оформление...'
	// 	}
	// };

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients());	
	}, [dispatch]);
	
	const {
		ingredientsAll, 
		ingredientsRequestFailed, 
		ingredientsRequestInProgress} = useSelector(store => store.ingredients);
	
	return (
		<>
			<AppHeader activePage = "Конструктор"/>		
			<DndProvider backend={HTML5Backend}>
				<main className={styles.main}>
					{ingredientsAll.length ?(
						<>
							<BurgerIngredients 							
								className = {`${styles.section} pt-10`}
							/>
							<BurgerConstructor 								
								className = {`${styles.section} pt-25`}
							/>
						</> ) : (null)
					}

					{ingredientsRequestFailed && <h1>Ошибка загрузки данных</h1> }
					{ingredientsRequestInProgress &&  <h1>Загрузка...</h1> }
				</main>		
			</DndProvider>	
		</>
	);
}