import React, { Component } from 'react'
import Ingredient from './ingredient/ingredient'
import styles from './group.module.css'
import { TIngredient } from '../../../types/index';

export default function Group({id, title, ingredients}: {id: string, title: string, ingredients: TIngredient[]}) {
	return (
		<>
		  	<h2 className = "text_type_main-medium" id = {id}>{title}</h2>
			<div className = {styles.container}>         
				{ingredients.map((ingredient, index)=>(
					<Ingredient 
						key = {ingredient._id}
						ingredientObj = {ingredient}						
					/>
				))} 
			</div>
		</>
	)
} 