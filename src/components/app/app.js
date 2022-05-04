import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { AppDataContext } from '../../services/app-data-context';
import { baseUrl } from '../../services/rest-api';
import { checkResponse } from '../../utils/check-response';


export default function App() {
	const ingredientsPath = '/ingredients';	

	const [state, setState] = React.useState(
		{
			activePage: 'Конструктор',
			ingredientsAll: [],
			isLoading: false,
			hasError: false,
			cartIngredients: [
				'60d3b41abdacab0026a733c6',
				'60d3b41abdacab0026a733c8',
				'60d3b41abdacab0026a733c9',			
				'60d3b41abdacab0026a733cb',
				'60d3b41abdacab0026a733cc',
				'60d3b41abdacab0026a733ce',
				'60d3b41abdacab0026a733d1',
				'60d3b41abdacab0026a733d3'
			],
			orderNumber: 0,
			orderStatus: 'Оформление...'
		}
	);
	
	React.useEffect(() => {		
		const getIngredients = () => {
			fetch(baseUrl + ingredientsPath)
				.then(checkResponse) 
				.then((res) => {
					if(res && res.success) {
						setState({ ...state, ingredientsAll: res.data, isLoading: false });       
					}else {
						setState({ ...state, hasError: true, isLoading: false });
					}
				})
				.catch((e) => {
					setState({ ...state, hasError: true, isLoading: false })
				})	
		}
		getIngredients();		
	}, []);


	return (
		<>
			<AppHeader activePage = {state.activePage}/>
			<AppDataContext.Provider value = {{state, setState}}>
				<main className={styles.main}>
					{!state.hasError ? (
						<>
							<BurgerIngredients 							
								className = {`${styles.section} pt-10`}
							/>
							<BurgerConstructor 								
								className = {`${styles.section} pt-25`}
							/>
						</>
					) : (
						<h1>Ошибка загрузки данных</h1>	
					)}
				</main>
			</AppDataContext.Provider>
		</>
	);
}