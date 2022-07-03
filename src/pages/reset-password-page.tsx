import React from 'react';
import styles from './common.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { resetPassword, setResetPasswordFormValue } from '../services/actions/user';
import { useSelector, useDispatch } from 'react-redux'; 

export function ResetPasswordPage() {

	const { password, token } = useSelector((store: any) => store.user.resetPassword.form);
	const { requestSuccess, requestFailed, requestFailMessage } = useSelector((store: any) => store.user.resetPassword);
	const forgotPasswordRequestSuccess = useSelector((store: any) => store.user.forgotPassword.requestSuccess);

	const dispatch = useDispatch();

	if(requestSuccess) {
		return <Redirect to = "/login" />;
	}
	if(!forgotPasswordRequestSuccess) {
		return <Redirect to = "/forgot-password" />;
	}


	const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {			
        dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
    }

	const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword({ password, token }));
    }


	return(
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<h1 className="text_type_main-medium">Восстановление пароля</h1>				
				<div className="mt-6">
					<Input  
						onChange={onFormChange} 
						name={'password'} 
						type={'password'}
						value={password}
						placeholder={'Введите новый пароль'}
					/>
				</div>				
				<div className="mt-6">
					<Input  
						onChange={onFormChange} 
						name={'token'} 	
						value={token}					
						placeholder={'Введите код из письма'}
						error={requestFailed}
						errorText={requestFailMessage}
					/>
				</div>		
				<div className="mt-6">
					<Button type="primary" htmlType="submit" size="large">
						Сохранить
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