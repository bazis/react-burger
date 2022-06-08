import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredients-details/ingredients-details';
import {useDispatch, useSelector} from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { LoginPage, 
			RegisterPage, 
			ForgotPasswordPage, 
			ResetPasswordPage, 
			ProfilePage, 
			IngredientPage,			
			PageNotFound } from '../../pages';

import { getIngredients } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/user';
import { ProtectedRoute } from '../../components/protected-route';
import Modal from '../modal/modal';



export default function App() {
	
	const location = useLocation();
	const history = useHistory();
	let prevLocation = location.state && location.state.prevLocation;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients());	
	}, [dispatch]);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const closeModalWindow = () => history.goBack();

	
	const {
		ingredientsAll, 
		ingredientsRequestFailed, 
		ingredientsRequestInProgress} = useSelector(store => store.ingredients);
	const currentUser = useSelector(store => store.user.currentUser) || {};
	
	return (
		<>
			<AppHeader currentUserName = {currentUser?.name}/>				
			<Switch location = {prevLocation || location}>
				<Route path="/" exact>
					<DndProvider backend={HTML5Backend}>
						<main className={styles.main}>
							{ingredientsAll.length ? (
								<>
									<BurgerIngredients 							
										className = {`${styles.section} pt-10`}
									/>
									<BurgerConstructor 								
										className = {`${styles.section} pt-25`}
									/>
								</> ) : (null)
							}

							{ingredientsRequestFailed && <h1>Ошибка загрузки данных</h1> }
							{ingredientsRequestInProgress &&  <h1>Загрузка...</h1> }
						</main>		
					</DndProvider>
				</Route>	
				<Route path="/login" exact>
					<LoginPage />
				</Route>
				<Route path="/register" exact>
					<RegisterPage />
				</Route>
				<Route path="/forgot-password" exact>
					<ForgotPasswordPage />
				</Route>
				<Route path="/reset-password" exact>
					<ResetPasswordPage />
				</Route>
				<ProtectedRoute path="/profile">
					<ProfilePage />
				</ProtectedRoute>		
				<Route path="/ingredients/:id" exact>
					<IngredientPage />
				</Route>	
				<Route>
					<PageNotFound />
				</Route>
			</Switch>	
			{ prevLocation && (
				<Route
					path="/ingredients/:id"
					children={
						<Modal 							
							title = "Детали ингридиента"
							onModalClose = {closeModalWindow}
						>
							<IngredientDetails />
						</Modal>	
					}
				/>
			)}		
			
		</>
	);
}