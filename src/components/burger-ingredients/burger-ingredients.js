import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import Group from './group/group';

class BurgerIngredients extends React.Component {
	constructor(props) {
		super(props);
    }

    groupsArr = [
        {bun: 'Булки'}, 
        {sauce: 'Соусы'}, 
        {main: 'Начинки'}
    ]

    render() {
		return (
            <div className = "pt-2"> {/*TODO почему паддинг не 10? */}
                <h1 className = {styles.title}>Соберите бургер</h1>
                <nav className = {styles.tabs}>          
                    {this.groupsArr.map((group, index) => (
                        <Tab key = {index}>{Object.values(group)[0]}</Tab>        
                    ))}                    
                </nav>
                <section className = "mt-10">
                    {this.groupsArr.map((group, index) => (
                        <Group 
                            key = {index} 
                            title = {Object.values(group)[0]}                             
                            ingredients = {this.props.ingredientsAll.filter(ingr => Object.keys(group)[0] === ingr.type)} 
                        />
                    ))}               
                </section>            
            </div>
        )
    }
}

export default BurgerIngredients;