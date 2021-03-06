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
import { ProtectedRoute } from '../protected-route';
import Modal from '../modal/modal';
import { TLocation, TLocationState } from '../../types';



export default function App() {
	
	const location: TLocationState = useLocation();
	const history = useHistory();
	let prevLocation: TLocation = location.state && location.state.prevLocation;

	const dispatch: any = useDispatch();

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
		ingredientsRequestInProgress} = useSelector((store: any) => store.ingredients);
	const currentUserName = useSelector((store: any) => store.user.currentUser.name);
	
	return (
		<>
			<AppHeader currentUserName = {currentUserName}/>				
			<Switch location = {prevLocation || location}>
				<Route path="/" exact>
					<DndProvider backend={HTML5Backend}>
						<main className={styles.main}>
							{ingredientsAll.length ? (
								<>
									<BurgerIngredients />
									<BurgerConstructor />
								</> ) : (null)
							}

							{ingredientsRequestFailed && <h1>???????????? ???????????????? ????????????</h1> }
							{ingredientsRequestInProgress &&  <h1>????????????????...</h1> }
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
							title = "???????????? ??????????????????????"
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