import React, { Component } from 'react'
import styles from './ingredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class Ingredient extends Component {
	render() {
		return (
			<div className = {styles.container}>
				<img className = {styles.image} src={this.props.image} alt={this.props.item_name}/>
				<div>
					<span className = {`${styles.price} pr-1`}>
						{this.props.price}
					</span>
					<CurrencyIcon type = "primary"/>
				</div>
				<div className={styles.item_name}>
					{this.props.item_name}
				</div>
			</div>
		)
	}
}

Ingredient.propTypes = {
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	item_name: PropTypes.string.isRequired
}

export default Ingredient;
