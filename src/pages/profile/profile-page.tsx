import React from 'react';
import styles from './profile-page.module.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { ProfileForm } from './profile-form';
import { Orders } from './orders';
import { Logout } from './logout';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/actions/user';

export function ProfilePage() {

	const dispatch = useDispatch();

	const onClickLogOut = () => {
		dispatch(logout());
	};

	return(
	
		<main className={styles.container}>			
			<nav className={`${styles.menu} mr-15`}>
				<ul>
					<li className={styles.menu_item}>
						<NavLink
							to = "/profile"							
							className = {`${styles.link} text_type_main-medium text_color_inactive`}							
							activeClassName = {styles.active_link}		
							exact
						>
							Профиль
						</NavLink>
					</li>
					<li className={styles.menu_item}>
						<NavLink
							to = "/profile/orders"
							className = {`${styles.link} text_type_main-medium text_color_inactive`}
							activeClassName = {styles.active_link}					
							exact
						>
							История заказов
						</NavLink>
					</li>
					<li className={styles.menu_item}>
						<NavLink
							to = "/profile/logout"
							className = {`${styles.link} text_type_main-medium text_color_inactive`}
							activeClassName = {styles.active_link}								
							onClick={ onClickLogOut }
							exact
						>
							Выход
						</NavLink>
					</li>
				</ul>
				<p className="text_type_main-default text_color_inactive mt-20">
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>
			<Switch>
				<Route path="/profile" exact>
					<ProfileForm />
				</Route>
				<Route path="/profile/orders" exact>
					<Orders />
				</Route>
				<Route path="/profile/logout" exact>
					<Logout />
				</Route>
			</Switch>
		</main>

	);
}