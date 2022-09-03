import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { IconButton } from './icon-button/icon-button';
import { NavLink, useLocation, Link  } from 'react-router-dom';

export default function AppHeader({currentUserName}: {currentUserName: string}) {

	const { pathname } = useLocation();

	function getIconCls(path: string) {
		return (pathname === path) ? 'primary' : 'secondary';
	}

	return (
		<nav className = {styles.header}>
			<NavLink 
				to={{ pathname: '/' }} 
				exact 
				activeClassName = {styles.link_active}
				className = {styles.link}  //TODO
			>
				<IconButton	text = 'Конструктор'>		
					<BurgerIcon type = {getIconCls('/')}/>
				</IconButton>
			</NavLink>	

			<NavLink to = {{ pathname: '/feed' }} exact activeClassName = {styles.link_active}>
				<IconButton	text = 'Лента заказов'>		
					<ListIcon type = {getIconCls('/orders')}/>
				</IconButton>				
			</NavLink>

			<Link to = {"/"} className = {styles.link}>
				<Logo />
			</Link>	

			<NavLink to = {{ pathname: '/profile' }} activeClassName = {styles.link_active}>
				<IconButton	text = {currentUserName ? currentUserName : 'Личный кабинет'}>		
					<ProfileIcon type = {getIconCls('/profile')}/>
				</IconButton>				
			</NavLink>
		</nav> 
	)
}
