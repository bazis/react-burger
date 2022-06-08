import React, { useRef, useState, createRef, useMemo } from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import Group from './group/group';
import IngredientDetails from '../ingredients-details/ingredients-details';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import { HIDE_INGREDIENT_DETAILS } from '../../services/actions/ingredients';

export default function BurgerIngredients() {
	const groupsArr = [
		{type: 'bun', name: 'Булки'}, 
		{type: 'sauce', name: 'Соусы'}, 
		{type: 'main', name: 'Начинки'},        
	];    

	const [activeTab, setActiveTab] = useState('bun');
 
	const ingredientsAll = useSelector(store => store.ingredients.ingredientsAll) || [];	
	
	const onTabClick = (tab) => {
		setActiveTab(tab);	
		const group = document.getElementById('group_' + tab);		
		if (group) {
			group.scrollIntoView({ behavior: "smooth" });
		}
	}

	const handleScroll = (e) => {

		const topY = e.currentTarget.offsetTop;
		// console.log('topY', topY);
		// console.log(document.getElementById('group_bun').getBoundingClientRect().y);
		// console.log(document.getElementById('group_sauce').getBoundingClientRect().y);
		// console.log(document.getElementById('group_main').getBoundingClientRect().y);

		const nearestGroup = groupsArr.reduce((a, b) => {					
			return (Math.abs(document.getElementById('group_' + a.type).getBoundingClientRect().y - topY) <
				Math.abs(document.getElementById('group_' + b.type).getBoundingClientRect().y - topY)) ?
				a : b;			
		});
				
        setActiveTab(nearestGroup.type);
    }
   
	return (
		<>
			<div className = {`${styles.container} pt-2`}> {/*TODO почему паддинг не 10? */}
				<h1 className = "text_type_main-large">Соберите бургер</h1>
				<nav className = {styles.tabs}>          
					{groupsArr.map((group, index) => (
						<Tab 
							key = {index}
							onClick = {() => onTabClick(group.type)}
							active = {group.type === activeTab}  >                             
								{group.name}
						</Tab>        
					))}                    
				</nav>
				<section className = {`${styles.groups} custom-scroll`}  onScroll={(e) => handleScroll(e)}>
					{groupsArr.map((group, index) => (
						<Group 
							key = {index} 
							title = {group.name}                          
							ingredients = {ingredientsAll.filter(ingr => group.type === ingr.type)} 
							id = {'group_' + group.type}
						/>
					))}               
				</section>            
			</div>  
		</>    
	)
}

