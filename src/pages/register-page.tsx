import React from 'react';
import styles from './common.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/store';
import { setRegisterFormValue, register } from '../services/actions/user';
import { TLocationState } from '../types/index';
 
export function RegisterPage() {

	const { name, email, password } = useSelector((store) => store.user.registration.form);
	const { requestFailed, requestFailMessage } = useSelector((store) => store.user.registration);
	const currentUserEmail = useSelector((store) => store.user.currentUser.email);

	const dispatch = useDispatch();
	const location: TLocationState = useLocation();

	if(currentUserEmail) {
		return <Redirect to = {location.state?.prevLocation || '/'} />;
	}

	const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {			
        dispatch(setRegisterFormValue(e.target.name, e.target.value));
    }

	const onFormSubmit = (e: React.FormEvent) => {
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
						errorText={requestFailMessage ? requestFailMessage : undefined}
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