import React from 'react';
import styles from './common.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoginFormValue, login } from '../services/actions/user';

export function LoginPage() {

	const { email, password } = useSelector(store => store.user.login.form);
	const { requestFailed, requestFailMessage } = useSelector(store => store.user.login);
	const currentUser = useSelector(store => store.user.currentUser);

	const dispatch = useDispatch();
	const location = useLocation();

	if(currentUser) {
		return <Redirect to = {location.state?.from || '/'} />;
	}

	const onFormChange = (e) => {			
        dispatch(setLoginFormValue(e.target.name, e.target.value));
    }

	const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

	return(
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<h1 className="text_type_main-medium">Вход</h1>
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
						Войти
					</Button>
				</div>
				<p className="text_type_main-default text_color_inactive mt-20">
					Вы — новый пользователь?
					<Link to="/register" className="pl-2">
						Зарегистрироваться
					</Link>
				</p>

				<p className="text_type_main-default text_color_inactive mt-4">
					Забыли пароль?
					<Link to="/forgot-password" className="pl-2">
						Восстановить пароль
					</Link>
				</p>
			</form>
		</div>
	);
}