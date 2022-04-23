import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ingredients from '../../utils/data';

class App extends React.Component {
  	constructor(props) {
    	super(props);    
  	}

  	state = {
    	activePage: 'Конструктор',
    	ingredientsAll: ingredients,
		cartIngredients: [
			'60666c42cc7b410027a1a9b1',
			'60666c42cc7b410027a1a9b4',
			'60666c42cc7b410027a1a9b9',			
			'60666c42cc7b410027a1a9bc',
			'60666c42cc7b410027a1a9bb',
			'60666c42cc7b410027a1a9bb',
			'60666c42cc7b410027a1a9bb',
			'60666c42cc7b410027a1a9bb'
		]
  	}

  	render() {
    	return (
			<>
				<AppHeader activePage = {this.state.activePage}/>
				<main className={styles.main}>
					<BurgerIngredients 
						ingredientsAll = {this.state.ingredientsAll} 
						className = {`${styles.section} pt-10`}
					/>
					<BurgerConstructor 
						cartIngredients = {this.state.ingredientsAll.filter(ingr => this.state.cartIngredients.indexOf(ingr._id) !== -1)} 
						className = {`${styles.section} pt-25`}
					/>
				</main>
			</>
    	);
  	}

}

export default App;
