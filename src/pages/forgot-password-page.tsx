import React from 'react';
import styles from './common.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { forgotPassword, setForgotPasswordFormValue } from '../services/actions/user';
import { useSelector, useDispatch } from '../services/store'; 

export function ForgotPasswordPage() {

	const { email } = useSelector((store) => store.user.forgotPassword.form);
	const { requestSuccess, requestFailed, requestFailMessage } = useSelector((store) => store.user.forgotPassword);
	
	const dispatch = useDispatch();
	const location = useLocation()

	const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {			
        dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
    }

	const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(forgotPassword( email ));
    }

	// let requestFailStatusText = '';
	// if(requestFailMessage === 404) {
	// 	requestFailStatusText = 'Такой E-mail не зарегистрирован';
	// }

	if(requestSuccess) {
		return ( <Redirect to='/reset-password' /> );
	}
	
	return(
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<h1 className="text_type_main-medium">Восстановление пароля</h1>				
				<div className="mt-6">
					<Input  
						onChange={onFormChange} 
						name={'email'} 
						type={'email'} 	
						value={email}					
						placeholder={'Укажите e-mail'}
						error={requestFailed}
						//errorText={requestFailStatusText}
					/>
				</div>	

				<div className="mt-6">
					<Button type="primary" htmlType="submit" size="large">
						Восстановить
					</Button>
				</div>
				<p className="text_type_main-default text_color_inactive mt-20">
					Вспомнили пароль?
					<Link to="/login" className="pl-2">
						Войти
					</Link>
				</p>
			</form>
		</div>
	);
}