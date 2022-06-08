import React from 'react';
import styles from './common.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRegisterFormValue, register } from '../services/actions/user';
 
export function RegisterPage() {

	const { name, email, password } = useSelector(store => store.user.registration.form);
	const { requestFailed, requestFailMessage } = useSelector(store => store.user.registration);
	const currentUser = useSelector(store => store.user.currentUser);

	const dispatch = useDispatch();
	const location = useLocation();

	if(currentUser) {
		return <Redirect to = {location.state?.from || '/'} />;
	}

	const onFormChange = (e) => {			
        dispatch(setRegisterFormValue(e.target.name, e.target.value));
    }

	const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(register({name, email, password}));
    }

	//переадресация на главную страницу после регистрации сработает через ProtectedRoute

	return(
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<h1 className="text_type_main-medium">Регистрация</h1>
				<div className="mt-6">
					<Input 						
						onChange={onFormChange} 
						name="name"
						value={name} 
						placeholder="Имя"
					/>
				</div>
				<div className="mt-6">
					<Input 
						type="email"
						onChange={onFormChange} 
						name="email" 
						value={email}
						placeholder="E-mail"
						error={requestFailed}
						errorText={requestFailMessage}
					/>
				</div>
				<div className="mt-6">
					<PasswordInput 
						onChange={onFormChange} 
						name={'password'} 
						value={password}
					/>
				</div>    
				<div className="mt-6">
					<Button type="primary" htmlType="submit" size="large">
						Зарегистрироваться
					</Button>
				</div>
				<p className="text_type_main-default text_color_inactive mt-20">
					Уже зарегистрированы?
					<Link to="/login" className="pl-2">
						Войти
					</Link>
				</p>
			</form>
		</div>
	);
}