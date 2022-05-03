import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { AppDataContext } from '../../services/app-data-context'


export default function App() {
	const apiURL = 'https://norma.nomoreparties.space/api/ingredients';	//этот URL часто отваливается по таймауту
	//const apiURL = 'https://api.codetabs.com/v1/proxy/?quest=https://fr.upravdom.duckdns.org/wl/?id=fNTuij9V6KeE1A0sa4ndGSpxFdg0s0iq&fmode=open';	

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
			fetch(apiURL)
				.then((res) => {
					if(res.ok) {
						return res.json();
					}
					return Promise.reject(res.status);				
				}) 
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
								ingredientsAll = {state.ingredientsAll} 
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