import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import IconButton from './icon-button/icon-button';
import PropTypes from 'prop-types';

export default function AppHeader(props) {
	function getIconCls(page) {
		return (props.activePage === page) ? 'primary' : 'secondary';
	}

	return (
		<nav className = {styles.header}>
			<IconButton	text = 'Конструктор' activePage = {props.activePage}>		
				<BurgerIcon type = {getIconCls('Конструктор')}/>
			</IconButton>
			<IconButton	text = 'Лента заказов' activePage = {props.activePage}>		
				<ListIcon type = {getIconCls('Лента заказов')}/>
			</IconButton>				
			<Logo />
			<IconButton	text = 'Личный кабинет' activePage = {props.activePage}>		
				<ProfileIcon type = {getIconCls('Личный кабинет')}/>
			</IconButton>				
		</nav> 
	)
}

AppHeader.propTypes = {
	activePage:  PropTypes.string.isRequired
}
