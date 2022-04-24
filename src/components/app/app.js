import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


export default function App() {
	const apiURL = 'https://norma.nomoreparties.space/api/ingredients';
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
			]
		}
	);

	
	React.useEffect(() => {		
		const getIngredients = () => {
			fetch(apiURL)
				.then((res) => res.json())
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
			<main className={styles.main}>
				{!state.hasError ? (
					<>
						<BurgerIngredients 
							ingredientsAll = {state.ingredientsAll} 
							className = {`${styles.section} pt-10`}
						/>
						<BurgerConstructor 
							cartIngredients = {state.ingredientsAll.filter(ingr => state.cartIngredients.indexOf(ingr._id) !== -1)} 
							className = {`${styles.section} pt-25`}
						/>
					</>
				) : (
					<h1>Ошибка загрузки данных</h1>	
				)}
			</main>
		</>
	);
}