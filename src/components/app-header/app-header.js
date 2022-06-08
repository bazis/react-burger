import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import IconButton from './icon-button/icon-button';
import PropTypes from 'prop-types';
import { NavLink, useLocation, Link  } from 'react-router-dom';

export default function AppHeader({ currentUserName}) {

	const { pathname } = useLocation();

	function getIconCls(path) {
		return (pathname === path) ? 'primary' : 'secondary';
	}

	return (
		<nav className = {styles.header}>
			<NavLink to={{ pathname: '/' }} exact activeClassName = "text_color_primary" >
				<IconButton	text = 'Конструктор'>		
					<BurgerIcon type = {getIconCls('/')}/>
				</IconButton>
			</NavLink>	

			<NavLink to = {{ pathname: '/orders' }} exact activeClassName = "text_color_primary">
				<IconButton	text = 'Лента заказов'>		
					<ListIcon type = {getIconCls('/orders')}/>
				</IconButton>				
			</NavLink>

			<Link to = {"/"} className = {styles.link}>
				<Logo />
			</Link>	

			<NavLink to = {{ pathname: '/profile' }} activeClassName = "text_color_primary">
				<IconButton	text = {currentUserName ? currentUserName : 'Личный кабинет'}>		
					<ProfileIcon type = {getIconCls('/profile')}/>
				</IconButton>				
			</NavLink>
		</nav> 
	)
}

AppHeader.propTypes = {
	activePage:  PropTypes.string.isRequired
}
