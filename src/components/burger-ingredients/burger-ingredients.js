import React, {useContext} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import Group from './group/group';
import { AppDataContext } from '../../services/app-data-context';

export default function BurgerIngredients() {
    const groupsArr = [
        {bun: 'Булки'}, 
        {sauce: 'Соусы'}, 
        {main: 'Начинки'}
    ];    

    const {state, setState} = useContext(AppDataContext);
 

    return (
        <>
            <div className = {`${styles.container} pt-2`}> {/*TODO почему паддинг не 10? */}
                <h1 className = "text_type_main-large">Соберите бургер</h1>
                <nav className = {styles.tabs}>          
                    {groupsArr.map((group, index) => (
                        <Tab key = {index}>{Object.values(group)[0]}</Tab>        
                    ))}                    
                </nav>
                <section className = {`${styles.groups} custom-scroll`}>
                    {groupsArr.map((group, index) => (
                        <Group 
                            key = {index} 
                            title = {Object.values(group)[0]}                          
                            ingredients = {state.ingredientsAll.filter(ingr => Object.keys(group)[0] === ingr.type)} 
                        />
                    ))}               
                </section>            
            </div>     
        </>    
    )
}

