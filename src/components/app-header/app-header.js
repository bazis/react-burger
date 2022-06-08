import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import IconButton from './icon-button/icon-button';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

export default function AppHeader({activePage, currentUserName}) {
	function getIconCls(page) {
		return (activePage === page) ? 'primary' : 'secondary';
	}

	//TODO подсвечивать активные ссылки

	return (
		<nav className = {styles.header}>
			<NavLink to={{ pathname: '/' }} activeClassName = "text_color_primary" >
				<IconButton	text = 'Конструктор' activePage = {activePage}>		
					<BurgerIcon type = {getIconCls('Конструктор')}/>
				</IconButton>
			</NavLink>	

			<NavLink to={{ pathname: '/orders' }} >
				<IconButton	text = 'Лента заказов' activePage = {activePage}>		
					<ListIcon type = {getIconCls('Лента заказов')}/>
				</IconButton>				
			</NavLink>

			<Logo />

			<NavLink to={{ pathname: '/profile' }} >
				<IconButton	text = {currentUserName ? currentUserName : 'Личный кабинет'} activePage = {activePage}>		
					<ProfileIcon type = {getIconCls('Личный кабинет')}/>
				</IconButton>				
			</NavLink>
		</nav> 
	)
}

AppHeader.propTypes = {
	activePage:  PropTypes.string.isRequired
}
