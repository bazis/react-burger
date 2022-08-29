import React, { useEffect } from 'react';
import styles from '../common.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/store';
import { getUser, updateUser, setProfileFormValue, PROFILE_FORM_RESET } from '../../services/actions/user';

export function ProfileForm() {
	const { name, email, password } = useSelector((store) => store.user.profile.form);
	const { requestSuccess, requestFailed, requestFailMessage } = useSelector((store) => store.user.profile);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]); //TODO не загружать пользователя, если он уже есть

	const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {			
        dispatch(setProfileFormValue(e.target.name, e.target.value));
    }

	const onFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUser({name, email, password}));
    }

	const onClickCancel = (e: React.SyntheticEvent) => {
		dispatch({
			type: PROFILE_FORM_RESET
		});
	};
	
	return(
		requestSuccess ? (
			<form className={styles.form} onSubmit={onFormSubmit}>				
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
						placeholder="Логин(E-mail)"
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
					<Button 
						type="secondary" 			
						size="medium" 
						htmlType="reset"
						onClick={onClickCancel}>
							Отмена
					</Button>   			
					<Button 
						type="primary" 
						htmlType="submit" 
						size="medium">
							Сохранить
					</Button>
				</div>        	
			</form>
		) : (
			<h1 className = {`${styles.container} text text_type_main-large`}>Загрузка...</h1>
		)
	);
}