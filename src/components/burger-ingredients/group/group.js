import React, { Component } from 'react'
import Ingredient from './ingredient/ingredient'
import styles from './group.module.css'


class Group extends Component {
  render() {
    return (
      <>
        <h2>{this.props.title}</h2>
        <div className = {styles.container}>         
          {this.props.ingredients.map((ingredient, index)=>(
              <Ingredient 
                key = {ingredient._id}
                item_name = {ingredient.name}
                price = {ingredient.price}
                image = {ingredient.image}              
              />
          ))} 
        </div>
      </>
    )
  }
}

export default Group