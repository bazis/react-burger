import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import IconButton from './icon-button/icon-button';
import PropTypes from 'prop-types';


class AppHeader extends React.Component {	
	constructor(props) {
		super(props);
	};

	getIconCls(page) {
		return (this.props.activePage === page) ? 'primary' : 'secondary';
	}

	render() {
		return (
			<nav className = {styles.header}>
				<IconButton	text = 'Конструктор' activePage = {this.props.activePage}>		
					<BurgerIcon type = {this.getIconCls('Конструктор')}/>
				</IconButton>
				<IconButton	text = 'Лента заказов' activePage = {this.props.activePage}>		
					<ListIcon type = {this.getIconCls('Лента заказов')}/>
				</IconButton>				
				<Logo />
				<IconButton	text = 'Личный кабинет' activePage = {this.props.activePage}>		
					<ProfileIcon type = {this.getIconCls('Личный кабинет')}/>
				</IconButton>				
			</nav> 
		)
	};
}

AppHeader.propTypes = {
	activePage:  PropTypes.string.isRequired
}

export default AppHeader;