import React, { Component } from 'react'
import Ingredient from './ingredient/ingredient'
import styles from './group.module.css'
import PropTypes from 'prop-types';
import { ingredient } from '../../../types/index';

export default function Group(props) {
	return (
		<>
		  <h2 className = "text_type_main-medium">{props.title}</h2>
		  <div className = {styles.container}>         
			  {props.ingredients.map((ingredient, index)=>(
				  <Ingredient 
					  key = {ingredient._id}
					  {...ingredient}
				  />
			  ))} 
		  </div>
		</>
  )
}

Group.propTypes = {
	ingredients: PropTypes.arrayOf(ingredient).isRequired
}
