import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import Group from './group/group';
import PropTypes from 'prop-types';
import { ingredient } from '../../types/index';

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
            <div className = {`${styles.container} pt-2`}> {/*TODO почему паддинг не 10? */}
                <h1 className = "text_type_main-large">Соберите бургер</h1>
                <nav className = {styles.tabs}>          
                    {this.groupsArr.map((group, index) => (
                        <Tab key = {index}>{Object.values(group)[0]}</Tab>        
                    ))}                    
                </nav>
                <section className = {`${styles.groups} custom-scroll`}>
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

BurgerIngredients.propTypes = {
	ingredientsAll: PropTypes.arrayOf(ingredient).isRequired
}


export default BurgerIngredients;